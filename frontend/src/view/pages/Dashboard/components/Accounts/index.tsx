import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { Mousewheel, Pagination } from "swiper/modules";

import { EyeIcon } from "@view/components/icons/EyeIcon";
import { AccountCard } from "../Accounts/AccountCard";
import { SliderNavigation } from "./SliderNavigation";
import { useAccountsController } from "./useAccountsController";
import { formatCurrency } from "@app/utils/formatCurrency";
import { cn } from "@app/utils/cn";
import { Spinner } from "@view/components/Spinner";
import { PlusIcon } from "@radix-ui/react-icons";

export function Accounts() {
  const {
    sliderState,
    setSliderState,
    windowWidth,
    areValuesVisible,
    toggleValueVisibility,
    isLoading,
    accounts,
  } = useAccountsController();

  return (
    <div className="bg-teal-900 rounded-2xl w-full h-full px-4 py-8 md:p-10 flex flex-col">
      {isLoading && (
        <div className="w-full h-full flex items-center justify-center">
          <Spinner className="w-10 h-10 text-teal-950/50 fill-white" />
        </div>
      )}

      {!isLoading && (
        <>
          <div>
            <span className="tracking-[0.5px] text-white">Saldo total</span>

            <div className="flex items-center gap-2">
              <strong
                className={cn(
                  "text-2xl tracking-[1px] text-white",
                  !areValuesVisible && "blur-[10px]"
                )}
              >
                {formatCurrency(6420.4)}
              </strong>
              <button
                onClick={toggleValueVisibility}
                className="w-8 h-8 flex items-center justify-center"
              >
                <EyeIcon open={!areValuesVisible} />
              </button>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-end mt-10 md:mt-0">
            {accounts.length === 0 && (
              <>
                <div className="mb-4">
                  <strong className="text-white tracking-[-1px] text-lg font-bold">
                    Minhas contas
                  </strong>
                </div>

                <button className="mt-4 h-52 rounded-2xl border-2 border-dashed border-teal-600 flex flex-col justify-center items-center gap-4 text-white">
                  <div className="w-11 h-11 rounded-full border-2 border-dashed border-white flex items-center justify-center">
                    <PlusIcon className="w-6 h-6" />
                  </div>
                  <span className="font-medium tracking-[-0.5px] block w-32 text-center">
                    Cadastre uma nova conta
                  </span>
                </button>
              </>
            )}

            {accounts.length > 0 && (
              <div>
                <Swiper
                  spaceBetween={16}
                  mousewheel
                  modules={[Mousewheel, Pagination]}
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
                    <strong className="text-white tracking-[-1px] text-lg font-bold">
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
                      balance={3450}
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
            )}
          </div>
        </>
      )}
    </div>
  );
}
