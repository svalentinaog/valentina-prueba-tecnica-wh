import { Request, Response } from "express";
import { Character } from "../models/characterModel";
import disneyService from "../services/disneyService";
import characterService from "../services/characterService";
import { AppError } from "../utils/AppError";

class CharacterController {
  // 1. All characters (Local + Disney)
  async getCharacters(req: Request, res: Response) {
    try {
      const { page = "1", limit = "12" } = req.query as {
        page?: string;
        limit?: string;
      };
      const pageNum = Math.max(1, Number(page) || 1);
      const limitNum = Math.max(1, Number(limit) || 12);
      const [localCharacters, disneyCharacters] = await Promise.all([
        Character.findAll({ order: [["date", "DESC"]] }),
        disneyService.getAllCharacters(),
      ]);

      const allCharacters = [...localCharacters, ...disneyCharacters];
      const totalItems = allCharacters.length;
      const totalPages = Math.max(1, Math.ceil(totalItems / limitNum));
      const start = (pageNum - 1) * limitNum;
      const items = allCharacters.slice(start, start + limitNum);

      res.json({
        items,
        page: pageNum,
        totalPages,
        totalItems,
      });
    } catch (error) {
      console.error(error);
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      res.status(500).json({
        msg: "Error retrieving characters",
        error: errorMessage,
      });
    }
  }

  // 2. Character by ID
  async getCharacterById(req: Request, res: Response) {
    const { id } = req.params as { id: string };

    try {
      if (id.includes("disney-")) {
        const cleanId = id.split("-")[1];

        const disneyChar = await disneyService.getCharacterById(cleanId);

        if (!disneyChar) {
          return res
            .status(404)
            .json({ msg: "Character not found in Disney API" });
        }
        return res.json(disneyChar);
      }

      const localChar = await Character.findByPk(id);

      if (!localChar) {
        return res
          .status(404)
          .json({ msg: "Character not found in the database" });
      }

      res.json(localChar);
    } catch (error) {
      console.error(error);
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      res.status(500).json({
        msg: "Error retrieving character detail",
        error: errorMessage,
      });
    }
  }

  // 3. Create character
  async createCharacter(req: Request, res: Response) {
    try {
      const newCharacter = await characterService.createCharacter(req.body);

      res.status(201).json({
        msg: "Character created successfully",
        data: newCharacter,
      });
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({
          msg: error.message,
          code: error.code,
          field: error.field,
        });
      }
      console.error(error);
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      res.status(500).json({
        msg: "Error creating character",
        error: errorMessage,
      });
    }
  }

  // 4. Update character
  async updateCharacter(req: Request, res: Response) {
    const { id } = req.params as { id: string };

    try {
      const updatedCharacter = await characterService.updateCharacter(
        id,
        req.body
      );

      res.json({
        msg: "Character updated successfully",
        data: updatedCharacter,
      });
    } catch (error: unknown) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({
          msg: error.message,
          code: error.code,
          field: error.field,
        });
      }

      console.error(error);
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      res.status(500).json({
        msg: "Error updating character",
        error: errorMessage,
      });
    }
  }

  // 5. Delete Character
  async deleteCharacter(req: Request, res: Response) {
    const { id } = req.params as { id: string };

    try {
      await characterService.deleteCharacter(id);

      res.json({ msg: "Character deleted successfully" });
    } catch (error: unknown) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ msg: error.message });
      }

      console.error(error);
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      res.status(500).json({
        msg: "Error deleting character",
        error: errorMessage,
      });
    }
  }
}

export default new CharacterController();
