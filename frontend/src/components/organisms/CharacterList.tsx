import { CharacterCard } from "@/components/molecules/CharacterCard";
import type { Character } from "@/types/character";

interface CharacterListProps {
  characters: Character[];
}

export default function CharacterList({ characters }: CharacterListProps) {
  if (!characters || characters.length === 0) {
    return (
      <div className="text-center py-10 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <p className="text-gray-500 text-lg">No hay personajes para mostrar.</p>
      </div>
    );
  }

  return (
    <div
      className="
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-2 
        lg:grid-cols-2 
        gap-6 md:gap-8
        w-full
      "
    >
      {characters.map((character) => {
        const { id } = character;
        return <CharacterCard key={id} character={character} />;
      })}
    </div>
  );
}
