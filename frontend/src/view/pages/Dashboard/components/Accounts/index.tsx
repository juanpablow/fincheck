import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { EyeIcon } from "../../../../components/icons/EyeIcon";
import { AccountCard } from "../Accounts/AccountCard";
import { SliderNavigation } from "./SliderNavigation";
import { useAccountsController } from "./useAccountsController";

export function Accounts() {
  const { sliderState, setSliderState, windowWidth } = useAccountsController();

  return (
    <div className="bg-teal-900 rounded-2xl w-full h-full px-4 py-8 md:p-10 flex flex-col">
      <div>
        <span className="tracking-[0.5px] text-white">Saldo total</span>

        <div className="flex items-center gap-2">
          <strong className="text-2xl tracking-[1px] text-white">
            R$ 1000,00
          </strong>
          <button className="w-8 h-8 flex items-center justify-center">
            <EyeIcon open />
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-end mt-10 md:mt-0">
        <div>
          <Swiper
            spaceBetween={16}
            slidesPerView={windowWidth <= 500 ? 1.2 : 2.1}
            onSlideChange={(swiper) => {
              setSliderState({
                isBeginning: swiper.isBeginning,
                isEnd: swiper.isEnd,
              });
            }}
          >
            <div
              slot="container-start"
              className="flex items-center justify-between mb-4"
            >
              <strong className="text-white tracking-[-1px] text-lg">
                Minhas contas
              </strong>

              <SliderNavigation
                isBeginning={sliderState.isBeginning}
                isEnd={sliderState.isEnd}
              />
            </div>
            <SwiperSlide>
              <AccountCard
                color="#7950F2"
                name="Nubank"
                balance={1000}
                type="checking"
              />
            </SwiperSlide>
            <SwiperSlide>
              <AccountCard
                color="#333"
                name="XP Investimentos"
                balance={3000}
                type="investment"
              />
            </SwiperSlide>
            <SwiperSlide>
              <AccountCard
                color="#3e9c35"
                name="Carteira"
                balance={100}
                type="cash"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
