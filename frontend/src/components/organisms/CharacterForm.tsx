import { CharacterImage } from "@/components/atoms/CharacterImage";
import { useCharacterForm } from "@/hooks/useCharacterForm";
import type { Character, CreateCharacterDTO } from "@/types/character";
import { DEFAULT_CHARACTER_IMG } from "@/utils/images";
import { Controller } from "react-hook-form";
import { Upload, CheckCircle } from "lucide-react";

interface CharacterFormProps {
  initialData?: Character | null;
  onSubmit: (data: CreateCharacterDTO) => Promise<void> | void;
  onCancel: () => void;
  isLoading: boolean;
}

export const CharacterForm = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading,
}: CharacterFormProps) => {
  const {
    isEditing,
    register,
    control,
    errors,
    onSubmitForm,
    selectedFile,
    previewImg,
    previewAlt,
    isUploading,
    showSuccessMsg,
    showGlobalErrorMsg,
    handleFileInputChange,
    handleCancel,
  } = useCharacterForm({ initialData, onSubmit, onCancel });
  const {
    name: nameError,
    description: descriptionError,
    file: fileError,
  } = errors;

  return (
    <form
      onSubmit={onSubmitForm}
      className="flex flex-col-reverse md:flex-row items-center gap-6 md:gap-8"
    >
      {/* Campos del formulario */}
      <div className="w-full flex flex-col gap-4 md:w-1/2">
        <div className="space-y-4">
          {/* NOMBRE */}
          <div>
            <input
              id="name"
              type="text"
              {...register("name")}
              placeholder="Nombre del personaje"
              className="w-full rounded-full bg-gray-200 px-4 py-2 text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-gray-400 transition"
            />
            {nameError && (
              <p className="mt-1 text-sm text-red-600 animate-pulse">
                {nameError.message}
              </p>
            )}
          </div>

          {/* IMAGEN */}
          <div>
            <Controller
              name="file"
              control={control}
              render={({ field }) => (
                <div>
                  <input
                    id="file"
                    type="file"
                    accept="image/png,image/jpeg"
                    name={field.name}
                    ref={field.ref}
                    onBlur={field.onBlur}
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      field.onChange(f);
                      handleFileInputChange(f);
                    }}
                    className="sr-only"
                  />
                  <label
                    htmlFor="file"
                    className="w-full rounded-full bg-gray-200 px-4 py-2 text-gray-900 outline-none flex items-center justify-start gap-2 cursor-pointer"
                  >
                    {isUploading ? (
                      <Upload className="w-4 h-4 text-gray-500 animate-spin" />
                    ) : selectedFile ? (
                      <CheckCircle className="w-4 h-4 text-gray-500" />
                    ) : (
                      <Upload className="w-4 h-4 text-gray-500" />
                    )}
                    <span>
                      {isUploading
                        ? "Subiendo..."
                        : selectedFile
                        ? "Imagen adjunta"
                        : "Subir imagen"}
                    </span>
                  </label>
                </div>
              )}
            />
            {selectedFile && (
              <p className="mt-1 text-sm text-gray-600">
                {selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)
              </p>
            )}
            {fileError && (
              <p className="mt-1 text-sm text-red-600 animate-pulse">
                {fileError.message as string}
              </p>
            )}
          </div>

          {/* DESCRIPCIÓN */}
          <div>
            <textarea
              id="description"
              rows={3}
              {...register("description")}
              placeholder="Descripción..."
              className="w-full min-h-[40px] rounded-3xl bg-gray-200 px-4 py-2 text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-gray-400 transition"
            />
            {descriptionError && (
              <p className="mt-1 text-sm text-red-600 animate-pulse">
                {descriptionError.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-4">
          {/* ÉXITO */}
          {showSuccessMsg && (
            <div className="p-3 rounded-lg bg-green-100 border border-green-400 text-green-700 text-sm flex items-center gap-2 animate-fade-in-down">
              <span className="text-xl">✅</span>
              <span>¡Personaje creado exitosamente!</span>
            </div>
          )}

          {/* ERROR */}
          {showGlobalErrorMsg && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm flex items-center gap-2 animate-pulse">
              <span className="text-xl">⚠️</span>
              <span>Ups, tienes campos sin llenar o con errores.</span>
            </div>
          )}

          {/* BOTONES DE ACCIÓN */}
          <div className="flex items-center gap-3">
            {isEditing && (
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition cursor-pointer"
              >
                Cancelar
              </button>
            )}

            <button
              type="submit"
              disabled={isLoading || isUploading}
              className={`px-6 py-2 rounded-full text-white transition font-medium cursor-pointer
                ${
                  isLoading || isUploading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gray-800 hover:bg-gray-700 shadow-lg hover:shadow-xl"
                }
              `}
            >
              {isLoading || isUploading
                ? "Guardando..."
                : isEditing
                ? "Actualizar"
                : "Crear"}
            </button>
          </div>
        </div>
      </div>

      {/* PREVIEW IMAGE  */}
      <div className="w-full md:w-1/2 h-[260px] sm:h-[360px] md:h-[500px] rounded-3xl overflow-hidden shadow-inner bg-gray-100">
        <CharacterImage
          src={previewImg}
          alt={previewAlt}
          fallbackSrc={DEFAULT_CHARACTER_IMG}
          className="w-full h-full object-cover"
        />
      </div>
    </form>
  );
};
