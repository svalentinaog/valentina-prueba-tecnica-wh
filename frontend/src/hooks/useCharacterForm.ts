import { useEffect, useMemo, useState } from "react";
import { imageService } from "@/services/imageService";
import type { Character, CreateCharacterDTO } from "@/types/character";
import { DEFAULT_CHARACTER_IMG } from "@/utils/images";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  getCharacterSchema,
  type CharacterFormValues,
} from "@/schemas/characterSchemas";

interface UseCharacterFormProps {
  initialData?: Character | null;
  onSubmit: (data: CreateCharacterDTO) => Promise<void> | void;
  onCancel: () => void;
}

export const useCharacterForm = ({
  initialData,
  onSubmit,
  onCancel,
}: UseCharacterFormProps) => {
  const isEditing = !!initialData;
  const schema = getCharacterSchema(isEditing);

  const [isUploading, setIsUploading] = useState(false);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [showGlobalErrorMsg, setShowGlobalErrorMsg] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setError,
    reset,
  } = useForm<CharacterFormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      name: initialData?.name ?? "",
      description: initialData?.description ?? "",
      file: undefined,
    },
  });

  const selectedFile = watch("file") as File | undefined;
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const previewImg = useMemo(() => {
    if (previewUrl) return previewUrl;
    return initialData?.img ?? DEFAULT_CHARACTER_IMG;
  }, [previewUrl, initialData]);

  const previewAlt = initialData?.name || "Previsualización";

  useEffect(() => {
    if (previewUrl) return () => URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  useEffect(() => {
    const subscription = watch(() => {
      if (showGlobalErrorMsg) setShowGlobalErrorMsg(false);
      if (showSuccessMsg) setShowSuccessMsg(false);
    });
    return () => subscription.unsubscribe();
  }, [watch, showGlobalErrorMsg, showSuccessMsg]);

  // --- LÓGICA DE SUBMIT ---
  const onValid = async (values: CharacterFormValues) => {
    const { name, description, file } = values;

    // Evitar llamadas si no hubo cambios (solo en edición)
    if (isEditing && initialData) {
      const isNameSame = name.trim() === initialData.name;
      const isDescSame = description.trim() === initialData.description;
      const isFileEmpty = !file;

      if (isNameSame && isDescSame && isFileEmpty) {
        onCancel();
        return;
      }
    }

    try {
      let finalImg = initialData?.img ?? "";

      if (file instanceof File) {
        setIsUploading(true);
        const { url } = await imageService.upload(file);
        finalImg = url;
      }

      const payload: CreateCharacterDTO = {
        name: name.trim(),
        description: description.trim(),
        img: finalImg,
        date: initialData?.date ?? new Date().toISOString(),
      };

      await onSubmit(payload);

      setShowSuccessMsg(true);
      setShowGlobalErrorMsg(false);

      if (!isEditing) {
        reset();
        setPreviewUrl(null);
      } else {
        reset(values);
      }

      setTimeout(() => setShowSuccessMsg(false), 3000);
    } catch (err) {
      const errorData =
        typeof err === "object" && err !== null && "response" in err
          ? (
              err as {
                response?: { data?: { code?: string; msg?: string } };
              }
            ).response?.data
          : undefined;
      const code = errorData?.code;

      if (code === "duplicate_name") {
        setError("name", {
          type: "server",
          message: errorData?.msg || "Este nombre ya está en uso",
        });
        setShowSuccessMsg(false);
      } else if (code === "duplicate_img") {
        setError("file", {
          type: "server",
          message: errorData?.msg || "Esta imagen ya existe",
        });
        setShowSuccessMsg(false);
      } else {
        setShowGlobalErrorMsg(true);
      }
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmitForm = handleSubmit(onValid, () => setShowGlobalErrorMsg(true));

  const handleFileInputChange = (file?: File) => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    if (file) setPreviewUrl(URL.createObjectURL(file));
  };

  const handleCancel = () => {
    reset();
    setShowGlobalErrorMsg(false);
    setShowSuccessMsg(false);
    onCancel();
  };

  return {
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
  };
};
