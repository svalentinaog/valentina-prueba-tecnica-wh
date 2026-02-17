import api from "@/services/api";
import type {
  Character,
  CreateCharacterDTO,
  UpdateCharacterDTO,
} from "@/types/character";

export const characterService = {
  // 1. OBTENER TODOS (Disney + Locales)
  getAll: async (page: number = 1, limit: number = 12) => {
    const { data } = await api.get<{
      items: Character[];
      page: number;
      totalPages: number;
      totalItems: number;
    }>(`/characters?page=${page}&limit=${limit}`);
    return data;
  },

  // 2. OBTENER UNO POR ID (Disney + Locales)
  getById: async (id: string | number): Promise<Character> => {
    const { data } = await api.get<Character>(`/characters/${id}`);
    return data;
  },

  // 3. CREAR UN PERSONAJE
  create: async (character: CreateCharacterDTO): Promise<Character> => {
    const { data } = await api.post<Character>("/characters", character);
    return data;
  },

  // 4. ACTUALIZAR UN PERSONAJE
  update: async (
    id: string | number,
    character: UpdateCharacterDTO
  ): Promise<Character> => {
    const { data } = await api.put<Character>(`/characters/${id}`, character);
    return data;
  },

  // 5. ELIMINAR UN PERSONAJE
  delete: async (id: string | number): Promise<void> => {
    await api.delete(`/characters/${id}`);
  },
};
