import { useState } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { characterService } from "@/services/characterService";
import type { UpdateCharacterDTO } from "@/types/character";

type UpdateCharacterPayload = {
  charId: string | number;
  data: UpdateCharacterDTO;
};

export const useCharacters = () => {
  const queryClient = useQueryClient();
  const PAGE_SIZE = 4;
  const [page, setPage] = useState(1);

  // --- READ (GET) ---
  const query = useQuery({
    queryKey: ["characters", page, PAGE_SIZE],
    queryFn: () => characterService.getAll(page, PAGE_SIZE),
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });
  const { data, isLoading, isError } = query;

  // --- CREATE (POST) ---
  const createMutation = useMutation({
    mutationFn: characterService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["characters"] });
    },
  });

  // --- UPDATE (PUT) ---
  const updateMutation = useMutation({
    mutationFn: ({ charId, data }: UpdateCharacterPayload) =>
      characterService.update(charId, data),
    onSuccess: (_, variables) => {
      const { charId } = variables;
      // Refresh de la lista general
      queryClient.invalidateQueries({ queryKey: ["characters"] });
      // Refresh de el detalle específico de este personaje
      queryClient.invalidateQueries({
        queryKey: ["character", String(charId)],
      });
    },
  });

  // --- DELETE (DELETE) ---
  const deleteMutation = useMutation({
    mutationFn: characterService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["characters"] });
    },
  });

  return {
    // Data
    characters: data,
    paginatedCharacters: data?.items ?? [],
    totalPages: data?.totalPages ?? 1,
    isLoading,
    isError,

    // Pagination
    page,
    setPage,

    // Actions
    createMutation,
    updateMutation,
    deleteMutation,
  };
};
