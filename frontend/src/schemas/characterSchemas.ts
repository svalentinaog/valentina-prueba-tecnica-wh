import { z } from "zod";

const alphabeticRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

const MESSAGES = {
  required: "Este campo es obligatorio",
  nameShort: "El nombre debe tener al menos 3 caracteres",
  descShort: "La descripción es muy corta (mínimo 10 caracteres)",
  descLong: "La descripción no puede exceder los 500 caracteres",
  onlyLetters: "Solo se permiten letras y espacios",
  imgRequired: "Debes seleccionar una imagen",
  imgInvalid: "El archivo debe ser una imagen válida (JPG o PNG)",
  imgSize: "La imagen es muy pesada (Máx. 5MB)",
};

// Fn que devuelve esquema configurado
export const getCharacterSchema = (isEditing: boolean) => {
  return z.object({
    // A) NOMBRE
    name: z
      .string()
      .trim()
      .min(1, MESSAGES.required)
      .min(3, MESSAGES.nameShort)
      .regex(alphabeticRegex, MESSAGES.onlyLetters),

    // B) DESCRIPCIÓN
    description: z
      .string()
      .trim()
      .min(1, MESSAGES.required)
      .min(10, MESSAGES.descShort)
      .max(500, MESSAGES.descLong)
      .regex(alphabeticRegex, MESSAGES.onlyLetters),

    // C) ARCHIVO
    file: z
      .any()
      .refine((file) => {
        // Si NO estamos editand/creando, el archivo es obligatorio
        if (!isEditing && !file) return false;
        return true;
      }, MESSAGES.imgRequired)
      .refine((file) => {
        if (file && !(file instanceof File)) return false;
        return true;
      }, MESSAGES.imgInvalid)
      .refine((file) => {
        if (!file) return true;
        return ["image/png", "image/jpeg", "image/jpg"].includes(file.type);
      }, MESSAGES.imgInvalid)
      .refine((file) => {
        if (!file) return true;
        return file.size <= 5 * 1024 * 1024;
      }, MESSAGES.imgSize),
  });
};

export type CharacterFormValues = z.infer<
  ReturnType<typeof getCharacterSchema>
>;
