import { HomeTemplate } from "@/components/templates/HomeTemplate";
import { useCharacters } from "@/hooks/useCharacters";
import type { CreateCharacterDTO } from "@/types/character";

export default function HomePage() {
  const {
    characters,
    paginatedCharacters,
    sliderCharacters,
    totalPages,
    isLoading,
    isError,
    page,
    setPage,
    createMutation,
  } = useCharacters();
  const { mutateAsync: createCharacter, isPending: isCreating } =
    createMutation;
  const items = characters?.items ?? [];
  const sliderItems = sliderCharacters.length ? sliderCharacters : items;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleCreate = async (data: CreateCharacterDTO) => {
    await createCharacter(data);
    setPage(1);
  };

  const handleCancel = () => {};

  if (isLoading && page === 1) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl font-semibold text-gray-600 animate-pulse">
          Cargando personajes...
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        Ocurrió un error al cargar los datos. Intenta recargar.
      </div>
    );
  }

  return (
    <HomeTemplate
      sliderItems={sliderItems}
      listItems={paginatedCharacters}
      currentPage={page}
      totalPages={totalPages}
      onPageChange={handlePageChange}
      onCreate={handleCreate}
      onCancel={handleCancel}
      isCreating={isCreating}
    />
  );
}
