import { CharacterImage } from "@/components/atoms/CharacterImage";
import { useCarousel } from "@/hooks/useCarousel";
import type { Character } from "@/types/character";
import { DEFAULT_CHARACTER_IMG, normalizeImageSrc } from "@/utils/images";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface CarouselProps {
  items: Character[];
}

export const Carousel = ({ items }: CarouselProps) => {
  const {
    normalized,
    activeIndex,
    handleSlideChange,
    handleAfterInit,
    handleSwiper,
  } = useCarousel(items);

  return (
    <section className="w-full h-auto flex flex-col items-center justify-center gap-8">
      <Swiper
        modules={[Pagination]}
        slidesPerView={3}
        centeredSlides
        spaceBetween={12}
        pagination={{ clickable: true }}
        onSlideChange={handleSlideChange}
        onAfterInit={handleAfterInit}
        onSwiper={handleSwiper}
        className="w-full"
        breakpoints={{
          640: { slidesPerView: 3, spaceBetween: 16 },
          768: { slidesPerView: 3, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 24 },
        }}
      >
        {normalized.map((item, index) => {
          const { id, img, name } = item;
          const isCenter = index === activeIndex;
          const scaleClass = isCenter
            ? "scale-105 sm:scale-100"
            : "scale-100 sm:scale-95 md:scale-90";
          return (
            <SwiperSlide key={id} className="!flex justify-center">
              <article
                className={`w-full aspect-[3/4] rounded-none overflow-hidden shadow-lg ring-1 ring-black/5 bg-white transform ${scaleClass} transition-transform`}
              >
                <CharacterImage
                  src={normalizeImageSrc(img, DEFAULT_CHARACTER_IMG)}
                  alt={name}
                  fallbackSrc={DEFAULT_CHARACTER_IMG}
                  className="w-full h-full object-cover rounded-none"
                />
              </article>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};
