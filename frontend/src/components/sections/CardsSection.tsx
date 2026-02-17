import { Heading } from "@/components/molecules/Heading";
import { Pagination } from "@/components/molecules/Pagination";
import CharacterList from "@/components/organisms/CharacterList";
import type { Character } from "@/types/character";

interface CardsSectionProps {
  characters: Character[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function CardsSection({
  characters,
  currentPage,
  totalPages,
  onPageChange,
}: CardsSectionProps) {
  return (
    <section className="w-full space-y-8">
      <Heading highlight="Lorem ipsum" title="Catálogo de personajes" />

      <div className="w-full space-y-4">
        <CharacterList characters={characters} />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </section>
  );
}
