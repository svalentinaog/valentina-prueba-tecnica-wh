import type { Character } from "@/types/character";
import { Link } from "react-router-dom";
import { CharacterImage } from "@/components/atoms/CharacterImage";
import { DEFAULT_CHARACTER_IMG, normalizeImageSrc } from "@/utils/images";

interface CharacterCardProps {
  character: Character;
}

export const CharacterCard = ({ character }: CharacterCardProps) => {
  const { id, img, name, description } = character;

  return (
    <Link to={`/characters/${id}`} className="block">
      <article
        className="
          w-full
          bg-white
          rounded-2xl
          shadow-lg
          ring-1 ring-black/5
          overflow-hidden
          transition-transform duration-300
          hover:shadow-xl hover:-translate-y-0.5
          cursor-pointer
        "
      >
        <div className="relative w-full aspect-square bg-gray-200">
          <CharacterImage
            src={normalizeImageSrc(img, DEFAULT_CHARACTER_IMG)}
            alt={name}
            fallbackSrc={DEFAULT_CHARACTER_IMG}
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-3 left-4 right-4 flex flex-col gap-2">
            <div className="rounded-full w-fit px-4 bg-gray-200 flex items-center justify-center">
              <p className="text-lg text-gray-600 truncate w-full max-w-xs">
                {name}
              </p>
            </div>
            <div className="rounded-full w-fit px-4 bg-gray-200 flex items-center justify-center">
              <p className="text-lg text-gray-600 truncate w-full max-w-xs">
                {/* // films */}
                {description}
              </p>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};
