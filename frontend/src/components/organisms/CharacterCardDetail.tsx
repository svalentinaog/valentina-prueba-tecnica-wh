import { Pencil, Trash2 } from "lucide-react";
import { CharacterImage } from "@/components/atoms/CharacterImage";
import { Heading } from "@/components/molecules/Heading";
import type { Character } from "@/types/character";
import { DEFAULT_CHARACTER_IMG, normalizeImageSrc } from "@/utils/images";

interface CharacterCardDetailProps {
  character: Character;
  isEditable?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function CharacterCardDetail({
  character,
  isEditable = false,
  onEdit,
  onDelete,
}: CharacterCardDetailProps) {
  const { id, name, img, date, description } = character;

  const fechaFormateada = date
    ? new Date(date).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "—";

  const filas = [
    { label: "Número ID", value: id },
    { label: "Nombre", value: name },
    { label: "Fecha creación", value: fechaFormateada },
  ];

  return (
    <div className="w-full space-y-8 sm:space-y-12">
      {/* Grid Imagen + Datos */}

      <div className="mx-auto max-w-7xl w-full grid md:grid-cols-2 gap-6 sm:gap-10 items-start px-4 sm:px-4">
        {/* Imagen */}
        <div className="w-full">
          <div className="rounded-2xl overflow-hidden shadow-lg ring-1 ring-black/5 bg-white w-full aspect-video max-h-[220px] sm:max-h-none md:aspect-[4/3] group">
            <CharacterImage
              src={normalizeImageSrc(img, DEFAULT_CHARACTER_IMG)}
              alt={name}
              fallbackSrc={DEFAULT_CHARACTER_IMG}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Información */}
        <div className="w-full flex flex-col gap-5 sm:gap-6">
          <Heading
            highlight="Ficha del personaje"
            title={name}
            align="left"
            size="lg"
          />

          <div className="space-y-3 sm:space-y-4">
            {filas.map(({ label, value }) => (
              <div
                key={label}
                className="rounded-full bg-gray-200 border border-gray-200 px-4 sm:px-6 py-3 w-full "
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    {label}
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    {value}
                  </span>
                </div>
              </div>
            ))}

            {/* BOTONES DE ACCIÓN */}
            {isEditable && (
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
                {/* Botón Editar */}
                <button
                  onClick={onEdit}
                  className="w-full sm:flex-1 cursor-pointer flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 hover:shadow-sm transition-all active:scale-95"
                >
                  <Pencil className="w-5 h-5" />
                  <span>Editar</span>
                </button>

                {/* Botón Eliminar */}
                <button
                  onClick={onDelete}
                  className="w-full sm:flex-1 cursor-pointer flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-red-50 text-red-600 border border-red-100 font-medium hover:bg-red-100 hover:border-red-200 hover:shadow-sm transition-all active:scale-95"
                >
                  <Trash2 className="w-5 h-5" />
                  <span>Eliminar</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Descripción */}
      <div className="relative w-full md:ml-auto md:max-w-[75%] rounded-3xl md:rounded-l-[100px] md:rounded-r-none bg-gray-100 border border-gray-100 px-5 sm:px-6 md:px-12 py-8 sm:py-10">
        <div className="absolute -top-4 left-6 md:left-12">
          <span className="inline-block rounded-full bg-gray-900 px-4 py-1 text-xs font-bold tracking-wide text-white shadow-md">
            DESCRIPCIÓN
          </span>
        </div>
        <p className="text-gray-600 leading-relaxed sm:leading-loose text-base sm:text-lg">
          {description || "Sin descripción disponible."}
        </p>
      </div>
    </div>
  );
}
