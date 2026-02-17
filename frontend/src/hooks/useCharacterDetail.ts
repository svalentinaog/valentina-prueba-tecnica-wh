import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCharacters } from "@/hooks/useCharacters";
import { characterService } from "@/services/characterService";
import { isLocalCharacter } from "@/utils/characterOrigin";

export const useCharacterDetail = (id: string | undefined) => {
  const navigate = useNavigate();

  // Consumo hook centralizado
  const { deleteMutation, updateMutation } = useCharacters();
  const { mutateAsync: deleteCharacter } = deleteMutation;

  const [isConfirmOpen, setConfirmOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);

  // Query para obtener el personaje por ID
  const query = useQuery({
    queryKey: ["character", id],
    queryFn: () => characterService.getById(id as string),
    enabled: !!id,
  });
  const { data } = query;

  const isEditable = data ? isLocalCharacter(data) : false;

  const openEdit = () => setEditOpen(true);
  const openConfirm = () => setConfirmOpen(true);
  const closeConfirm = () => setConfirmOpen(false);
  const closeEdit = () => setEditOpen(false);

  // Wrapper para eliminar y redirigir
  const handleDelete = async () => {
    if (!id) return;
    await deleteCharacter(id);
    navigate("/");
  };

  return {
    query,
    isEditable,

    // Modales
    isConfirmOpen,
    isEditOpen,
    openEdit,
    openConfirm,
    closeConfirm,
    closeEdit,

    // Mutaciones
    handleDelete,
    updateMutation,
    deleteMutation,
  };
};
