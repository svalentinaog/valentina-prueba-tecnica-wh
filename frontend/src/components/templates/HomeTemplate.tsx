import { CardsSection } from "@/components/sections/CardsSection";
import { FormSection } from "@/components/sections/FormSection";
import { SliderSection } from "@/components/sections/SliderSection";
import { Container } from "@/components/layout/Container";
import type { Character, CreateCharacterDTO } from "@/types/character";

interface HomeTemplateProps {
  sliderItems: Character[];
  listItems: Character[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onCreate: (data: CreateCharacterDTO) => void;
  onCancel: () => void;
  isCreating: boolean;
}

export function HomeTemplate({
  sliderItems,
  listItems,
  currentPage,
  totalPages,
  onPageChange,
  onCreate,
  onCancel,
  isCreating,
}: HomeTemplateProps) {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="space-y-12">
        <Container className="bg-gray-100 px-0">
          <SliderSection items={sliderItems} />
        </Container>

        <Container>
          <CardsSection
            characters={listItems}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </Container>

        <FormSection
          initialData={null}
          onSubmit={onCreate}
          onCancel={onCancel}
          isLoading={isCreating}
        />
      </div>
    </main>
  );
}
