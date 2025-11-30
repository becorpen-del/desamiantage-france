export const BANNED_WORDS = [
  "viagra",
  "casino",
  "bitcoin",
  "escort",
  "xxx",
  "porn",
  "loan",
  "credit rapide",
  "work from home",
  "cheap pills",
] as const;

const normalizedWords = BANNED_WORDS.map(word => word.toLowerCase());

export function containsBannedWord(text: string): boolean {
  const lower = text.toLowerCase();
  return normalizedWords.some(word => lower.includes(word));
}

export function hasBannedContent(fields: Record<string, unknown>): boolean {
  return Object.values(fields).some(value => {
    if (typeof value === "string") {
      return containsBannedWord(value);
    }
    return false;
  });
}
