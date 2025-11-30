import { CITIES } from "./constants";
import { containsBannedWord } from "./antiSpam";
import type { LeadPayload } from "./validators";

const MIN_DESCRIPTION_SCORE_LENGTH = 50;

export function countDigits(value: string): number {
  return value.replace(/\D/g, "").length;
}

export function isValidLeadPhone(phone: string): boolean {
  const digits = countDigits(phone);
  return digits >= 10 && digits <= 15;
}

function postalMatchesCity(codePostal: string, ville: string): boolean {
  const normalizedCity = ville.trim().toLowerCase();

  const match = CITIES.find(
    city =>
      city.city.toLowerCase() === normalizedCity ||
      city.neighbors.some(neighbor => neighbor.toLowerCase() === normalizedCity),
  );

  if (!match) {
    return false;
  }

  return match.cp === codePostal;
}

export function scoreLead(payload: LeadPayload): number {
  let score = 0;

  if (isValidLeadPhone(payload.telephone)) {
    score += 2;
  }

  if (postalMatchesCity(payload.codePostal, payload.ville)) {
    score += 1;
  }

  if (payload.description.trim().length >= MIN_DESCRIPTION_SCORE_LENGTH) {
    score += 1;
  }

  if (
    containsBannedWord(payload.description) ||
    containsBannedWord(payload.nom) ||
    containsBannedWord(payload.ville)
  ) {
    score -= 2;
  }

  return score;
}
