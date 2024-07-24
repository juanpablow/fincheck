import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useSwiper } from "swiper/react";

export function SliderNavigation() {
  const swiper = useSwiper();

  return (
    <>
      <button
        className="absolute left-0 top-1/2 bg-gradient-to-r from-gray-100 to-transparent -translate-y-1/2 w-12 h-12 flex items-center justify-center z-10"
        onClick={() => swiper.slidePrev()}
      >
        <ChevronLeftIcon className="w-6 h-6 text-gray-800" />
      </button>

      <button
        className="absolute right-0 top-1/2 bg-gradient-to-l from-gray-100 to-transparent -translate-y-1/2 w-12 h-12 flex items-center justify-center z-10"
        onClick={() => swiper.slideNext()}
      >
        <ChevronRightIcon className="w-6 h-6 text-gray-800" />
      </button>
    </>
  );
}
