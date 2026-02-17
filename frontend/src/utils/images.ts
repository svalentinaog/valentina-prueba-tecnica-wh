export const DEFAULT_CHARACTER_IMG = "/img_default_character.jpg";

export function normalizeImageSrc(
  input: unknown,
  fallback: string = DEFAULT_CHARACTER_IMG
): string {
  if (typeof input !== "string") return fallback;
  const trimmed = input.trim();
  if (!trimmed) return fallback;
  return trimmed;
}
