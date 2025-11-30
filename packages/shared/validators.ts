import { z } from "zod";

import { SERVICES } from "./constants";

const postalCodeRegex = /^\d{5}$/;
const phoneRegex = /^[0-9+().\s-]{9,20}$/;
const nameRegex = /^[\p{L}\p{M}\s.'-]+$/u;

export const BUILDING_TYPES = ["House", "Apartment", "Commercial", "Industrial"] as const;
export const DEADLINE_OPTIONS = ["Urgent 48h", "< 7 jours", "> 7 jours"] as const;

const serviceSlugs = SERVICES.map(service => service.slug) as [string, ...string[]];

export const leadSchema = z
  .object({
    nom: z
      .string()
      .trim()
      .min(2, "Merci d'indiquer votre nom (2 caractères minimum).")
      .max(80, "Merci de limiter votre nom à 80 caractères.")
      .refine(value => nameRegex.test(value), "Merci d'utiliser des caractères valides."),
    email: z.string().trim().email("Adresse e-mail invalide."),
    telephone: z
      .string()
      .trim()
      .regex(phoneRegex, "Numéro de téléphone invalide (10 à 20 caractères)."),
    codePostal: z
      .string()
      .trim()
      .regex(postalCodeRegex, "Code postal invalide (5 chiffres attendus)."),
    ville: z
      .string()
      .trim()
      .min(2, "Merci d'indiquer la ville d'intervention.")
      .max(80, "Ville trop longue (80 caractères max)."),
    typeBatiment: z.enum(BUILDING_TYPES, {
      errorMap: () => ({ message: "Sélectionnez un type de bâtiment." }),
    }),
    typePrestation: z.enum(serviceSlugs, {
      errorMap: () => ({ message: "Sélectionnez un type de prestation." }),
    }),
    description: z
      .string()
      .trim()
      .min(20, "Décrivez votre projet en quelques lignes (20 caractères minimum).")
      .max(800, "Merci de limiter votre description à 800 caractères."),
    delai: z.enum(DEADLINE_OPTIONS, {
      errorMap: () => ({ message: "Sélectionnez un délai prévisionnel." }),
    }),
    consentement: z.literal(true, {
      errorMap: () => ({ message: "Le consentement est requis (RGPD)." }),
    }),
    recaptchaToken: z.string().min(1, "reCAPTCHA requis.").optional(),
    honeypot: z
      .string()
      .max(0, "Détection anti-spam.")
      .optional()
      .transform(value => value ?? ""),
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
  .transform(payload => ({
    ...payload,
    description: payload.description.trim(),
  }));

export type LeadPayload = z.infer<typeof leadSchema>;
