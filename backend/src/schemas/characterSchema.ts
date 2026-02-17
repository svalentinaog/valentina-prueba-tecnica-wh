import { z } from "zod";

const alphabeticRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

const characterCore = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters long")
    .regex(
      alphabeticRegex,
      "Name must contain only alphabetic characters"
    ),

  date: z
    .string()
    .refine((val) => !Number.isNaN(Date.parse(val)), "Invalid date")
    .optional(),

  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters long")
    .regex(
      alphabeticRegex,
      "Description must contain only alphabetic characters"
    ),

  img: z.url({ message: "Must be a valid URL (http://...)" }),
});

export const CreateCharacterSchema = z.object({
  body: characterCore,
});

export const UpdateCharacterSchema = z.object({
  body: characterCore.partial(),
});

export type CreateCharacterType = z.infer<typeof CreateCharacterSchema>["body"];
export type UpdateCharacterType = z.infer<typeof UpdateCharacterSchema>["body"];
