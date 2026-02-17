import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/molecules/Heading";
import { CharacterForm } from "@/components/organisms/CharacterForm";
import type { Character, CreateCharacterDTO } from "@/types/character";

interface FormSectionProps {
  initialData?: Character | null;
  onSubmit: (data: CreateCharacterDTO) => void;
  onCancel: () => void;
  isLoading: boolean;
}

export function FormSection({
  initialData = null,
  onSubmit,
  onCancel,
  isLoading,
}: FormSectionProps) {
  return (
    <section className="w-full space-y-6 flex flex-col items-center gap-8">
      <Heading
        highlight="Personalice su personaje"
        title="Formulario de creación"
        size="md"
      />
      <Container className="bg-gray-100 rounded-2xl p-0">
        <CharacterForm
          initialData={initialData}
          onSubmit={onSubmit}
          onCancel={onCancel}
          isLoading={isLoading}
        />
      </Container>
    </section>
  );
}
