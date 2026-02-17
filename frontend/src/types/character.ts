export interface Character {
  id: number | string;
  name: string;
  img: string;
  description?: string;
  date?: Date | string;
}

export type CreateCharacterDTO = Omit<Character, "id">;

export type UpdateCharacterDTO = Partial<CreateCharacterDTO>;
