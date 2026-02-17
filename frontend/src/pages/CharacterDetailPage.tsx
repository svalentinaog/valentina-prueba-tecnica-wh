import { useParams } from "react-router-dom";
import { CharacterDetailTemplate } from "@/components/templates/CharacterDetailTemplate";
import Modal from "@/components/molecules/Modal";
import { CharacterForm } from "@/components/organisms/CharacterForm";
import { useCharacterDetail } from "@/hooks/useCharacterDetail";
import type { CreateCharacterDTO } from "@/types/character";

export default function CharacterDetailPage() {
  const { id } = useParams();

  const {
    query,
    isEditable,
    isConfirmOpen,
    isEditOpen,
    openEdit,
    openConfirm,
    closeConfirm,
    closeEdit,
    handleDelete,
    updateMutation,
    deleteMutation,
  } = useCharacterDetail(id);
  const { data, isLoading, isError } = query;
  const { mutateAsync: updateCharacter, isPending: isUpdating } =
    updateMutation;
  const { isPending: isDeleting } = deleteMutation;

  if (isLoading) return <div className="p-10 text-center">Cargando...</div>;
  if (isError || !data)
    return <div className="p-10 text-center text-red-500">Error al cargar</div>;

  const handleUpdate = async (payload: CreateCharacterDTO) => {
    const { id: characterId } = data;
    await updateCharacter({
      charId: characterId,
      data: payload,
    });
    closeEdit();
  };

  return (
    <>
      <CharacterDetailTemplate
        character={data}
        isEditable={isEditable}
        onEdit={openEdit}
        onDelete={openConfirm}
      />

      {isEditable && (
        <>
          <Modal
            open={isConfirmOpen}
            onClose={closeConfirm}
            title="¿Estás seguro?"
            footer={
              <div className="flex gap-3">
                <button
                  onClick={closeConfirm}
                  className="px-4 py-2 bg-gray-200 rounded-full cursor-pointer"
                >
                  No
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 cursor-pointer"
                >
                  {isDeleting ? "Eliminando..." : "Sí"}
                </button>
              </div>
            }
          >
            <p>Esta acción no se puede deshacer.</p>
          </Modal>

          <Modal
            open={isEditOpen}
            onClose={closeEdit}
            title="Editar tu personaje"
            size="lg"
          >
            <CharacterForm
              initialData={data}
              isLoading={isUpdating}
              onCancel={closeEdit}
              onSubmit={handleUpdate}
            />
          </Modal>
        </>
      )}
    </>
  );
}
