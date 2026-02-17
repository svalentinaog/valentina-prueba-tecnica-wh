import express from "express";
import characterController from "../controllers/characterController";
import { validateSchema } from "../middlewares/validateSchema";
import {
  CreateCharacterSchema,
  UpdateCharacterSchema,
} from "../schemas/characterSchema";

const router = express.Router();

router.get("/", characterController.getCharacters);
router.get("/:id", characterController.getCharacterById);
router.post(
  "/",
  validateSchema(CreateCharacterSchema),
  characterController.createCharacter
);
router.put(
  "/:id",
  validateSchema(UpdateCharacterSchema),
  characterController.updateCharacter
);
router.delete("/:id", characterController.deleteCharacter);

export default router;
