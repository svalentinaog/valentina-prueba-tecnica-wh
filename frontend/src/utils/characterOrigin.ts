import type { Character } from "@/types/character";

export function isDisneyCharacter(char: Character) {
  return typeof char.id === "string" && char.id.startsWith("disney-");
}

export function isLocalCharacter(char: Character) {
  return !isDisneyCharacter(char);
}
