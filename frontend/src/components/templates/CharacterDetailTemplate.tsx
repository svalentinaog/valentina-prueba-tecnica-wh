import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { CharacterCardDetail } from "@/components/organisms/CharacterCardDetail";
import type { Character } from "@/types/character";

interface CharacterDetailTemplateProps {
  character: Character;
  isEditable?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function CharacterDetailTemplate({
  character,
  isEditable = false,
  onEdit,
  onDelete,
}: CharacterDetailTemplateProps) {
  return (
    <main className="min-h-screen bg-gray-50 pb-20 pt-10">
      <div className="mx-auto max-w-7xl w-full mb-8 px-4 sm:px-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors font-medium group"
        >
          <div className="p-2 bg-white rounded-full shadow-sm ring-1 ring-gray-200 group-hover:ring-gray-300 transition-all">
            <ArrowLeft className="w-5 h-5" />
          </div>
          <span>Volver al inicio</span>
        </Link>
      </div>

      <CharacterCardDetail
        character={character}
        isEditable={isEditable}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </main>
  );
}
