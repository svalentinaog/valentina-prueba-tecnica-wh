import { useMemo, useRef, useState } from "react";
import type { Character } from "@/types/character";
import type { Swiper as SwiperInstance } from "swiper/types";

export const useCarousel = (items: Character[]) => {
  const MAX_SLIDES = 15;

  const normalized = useMemo(
    () => items.slice(0, Math.min(items.length, MAX_SLIDES)),
    [items]
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperInstance | null>(null);

  const handleSlideChange = (sw: SwiperInstance) =>
    setActiveIndex(sw.realIndex);
  const handleAfterInit = (sw: SwiperInstance) => setActiveIndex(sw.realIndex);
  const handleSwiper = (sw: SwiperInstance) => {
    swiperRef.current = sw;
  };

  return {
    normalized,
    activeIndex,
    handleSlideChange,
    handleAfterInit,
    handleSwiper,
  };
};
