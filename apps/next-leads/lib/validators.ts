import { z } from "zod";

import { extractDigits, slugify } from "./utils";

export const BUILDING_TYPES = ["Maison", "Appartement", "Tertiaire", "Industriel"] as const;
export const PRESTATION_TYPES = ["Diagnostic", "Retrait", "Toiture", "Industriel"] as const;
export const DEADLINE_OPTIONS = ["Urgent 48h", "< 7 jours", "> 7 jours"] as const;

const phoneRegex = /^(?:\+33\s?|0)(?:[1-9](?:[\s.-]?\d{2}){4})$/;
const postalCodeRegex = /^\d{5}$/;
const nameRegex = /^[\p{L}\p{M}\s.'-]+$/u;

const bannedWords = ["test", "fake", "essai", "spam", "www", "http"];

const prestationEnum = z.enum(PRESTATION_TYPES);
const buildingEnum = z.enum(BUILDING_TYPES);
const deadlineEnum = z.enum(DEADLINE_OPTIONS);

export const leadSchema = z
  .object({
    nom: z
      .string()
      .trim()
      .min(2, "Merci d'indiquer votre nom (2 caractères minimum).")
      .max(80, "Nom trop long (80 caractères max).")
      .refine(value => nameRegex.test(value), "Merci d'utiliser des caractères autorisés."),
    email: z
      .string()
      .trim()
      .email("Adresse e-mail invalide.")
      .toLowerCase(),
    telephone: z
      .string()
      .trim()
      .transform(value => value.replace(/\s+/g, " "))
      .refine(value => phoneRegex.test(value.replace(/\s+/g, "")), "Numéro de téléphone français attendu."),
    codePostal: z
      .string()
      .trim()
      .refine(value => postalCodeRegex.test(value), "Code postal invalide (5 chiffres)."),
    ville: z
      .string()
      .trim()
      .min(2, "Merci d'indiquer la ville d'intervention.")
      .max(80, "Ville trop longue (80 caractères max)."),
    typeBatiment: buildingEnum,
    typePrestation: prestationEnum,
    description: z
      .string()
      .trim()
      .min(20, "Décrivez votre besoin (20 caractères minimum).")
      .max(1000, "Description trop longue (1000 caractères max)."),
    delai: deadlineEnum,
    consentement: z.literal(true, {
      errorMap: () => ({ message: "Le consentement RGPD est requis." }),
    }),
    honeypot: z
      .string()
      .optional()
      .transform(value => value?.trim() ?? ""),
    recaptchaToken: z
      .string()
      .min(1)
      .optional(),
    submitDelay: z.number().int().nonnegative(),
    utm: z
      .object({
        source: z.string().nullish(),
        medium: z.string().nullish(),
        campaign: z.string().nullish(),
        term: z.string().nullish(),
        content: z.string().nullish(),
      })
      .optional(),
    gclid: z.string().nullish(),
  })
  .superRefine((payload, ctx) => {
    if (bannedWords.some(word => payload.description.toLowerCase().includes(word))) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Le message contient des termes bloqués.",
        path: ["description"],
      });
    }

    if (bannedWords.some(word => payload.nom.toLowerCase().includes(word))) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Nom invalide.",
        path: ["nom"],
      });
    }
  });

export type LeadPayload = z.infer<typeof leadSchema>;

export function sanitizeLeadPayload(payload: LeadPayload): LeadPayload {
  const trimmed = {
    ...payload,
    nom: payload.nom.trim(),
    email: payload.email.trim(),
    telephone: payload.telephone.trim(),
    ville: payload.ville.trim(),
    description: payload.description.trim(),
  };

  return leadSchema.parse(trimmed);
}

export function containsBannedWord(value: string): boolean {
  if (!value) {
    return false;
  }

  const lowered = value.toLowerCase();
  return bannedWords.some(word => lowered.includes(word));
}

export function scoreLead(payload: LeadPayload): number {
  let score = 0;

  const normalizedPhone = payload.telephone.replace(/\s+/g, "");
  if (phoneRegex.test(normalizedPhone)) {
    score += 2;
  }

  if (postalCodeRegex.test(payload.codePostal) && !/(.)\1{4}/.test(payload.codePostal)) {
    score += 1;
  }

  if (payload.description.length >= 50) {
    score += 1;
  }

  if (containsBannedWord(payload.description) || containsBannedWord(payload.nom)) {
    score -= 2;
  }

  return score;
}

export function normalizeCitySlug(value: string): string {
  return slugify(value);
}

export function isPhoneLikelyMobile(phone: string): boolean {
  const digits = extractDigits(phone);
  if (digits.startsWith("0")) {
    return digits[1] === "6" || digits[1] === "7";
  }

  if (digits.startsWith("33") && digits.length >= 11) {
    return digits[2] === "6" || digits[2] === "7";
  }

  return false;
}
