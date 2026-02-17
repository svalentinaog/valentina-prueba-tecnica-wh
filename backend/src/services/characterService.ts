import { Character } from "../models/characterModel";
import { AppError } from "../utils/AppError";
import type {
  UpdateCharacterType,
  CreateCharacterType,
} from "../schemas/characterSchema";

export class CharacterService {
  private normalizeText(s: string) {
    return s
      .trim()
      .replace(/\s+/g, " ")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  async createCharacter(data: CreateCharacterType) {
    const all = await Character.findAll();
    const nameKey = this.normalizeText(data.name);
    const imgKey = data.img.trim();

    const nameExists = all.some((c) => this.normalizeText(c.name) === nameKey);
    if (nameExists) {
      throw new AppError("Name already exists", 409, "duplicate_name", "name");
    }

    const imgExists = all.some((c) => c.img.trim() === imgKey);
    if (imgExists) {
      throw new AppError("Image already exists", 409, "duplicate_img", "img");
    }

    return await Character.create({
      name: data.name.trim(),
      description: (data.description ?? "").trim(),
      img: imgKey,
      date: data.date ?? new Date().toISOString(),
    });
  }

  async updateCharacter(id: string, data: UpdateCharacterType) {
    if (id.includes("disney-")) {
      throw new AppError("You cannot edit Disney characters", 403);
    }

    const character = await Character.findByPk(id);
    if (!character) {
      throw new AppError("Character not found", 404);
    }

    const all = await Character.findAll();
    if (data.name) {
      const nameKey = this.normalizeText(data.name);
      const clash = all.find(
        (c) => c.id !== Number(id) && this.normalizeText(c.name) === nameKey
      );
      if (clash) {
        throw new AppError(
          "Name already exists",
          409,
          "duplicate_name",
          "name"
        );
      }
    }

    if (data.img) {
      const imgKey = data.img.trim();
      const clash = all.find(
        (c) => c.id !== Number(id) && c.img.trim() === imgKey
      );
      if (clash) {
        throw new AppError("Image already exists", 409, "duplicate_img", "img");
      }
    }

    return await character.update(data);
  }

  async deleteCharacter(id: string) {
    if (id.includes("disney-")) {
      throw new AppError(
        "You do not have permission to delete Disney characters",
        403
      );
    }

    const deletedCount = await Character.destroy({ where: { id } });

    if (deletedCount === 0) {
      throw new AppError("Character does not exist in the database", 404);
    }

    return true;
  }
}

export default new CharacterService();
