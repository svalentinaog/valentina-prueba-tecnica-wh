import { Carousel } from "@/components/organisms/Carousel";
import type { Character } from "@/types/character";

interface SliderSectionProps {
  items: Character[];
}

export function SliderSection({ items }: SliderSectionProps) {
  return (
    <div className="w-full md:min-h-[600px] flex flex-col justify-center rounded-2xl">
      <Carousel items={items} />
    </div>
  );
}
