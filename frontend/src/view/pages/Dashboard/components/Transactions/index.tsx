import { ChevronDownIcon } from "@radix-ui/react-icons";
import { TransactionsIcon } from "@view/components/icons/TransactionsIcon";
import { FilterIcon } from "@view/components/icons/FilterIcon";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination } from "swiper/modules";
import { MONTHS } from "@app/config/constants";
import { SliderOption } from "./SliderOption";
import { SliderNavigation } from "./SliderNavigation";
import { formatCurrency } from "@app/utils/formatCurrency";
import { CategoryIcon } from "@view/components/icons/categories/CategoryIcon";
import { useTransactionsController } from "./useTransactionsController";
import { cn } from "@app/utils/cn";
import { Spinner } from "@view/components/Spinner";
import emptyStateImage from "@assets/empty-state.svg";

export function Transactions() {
  const { areValuesVisible, transactions, isInitialLoading, isLoading } =
    useTransactionsController();

  const hasTransactions = transactions.length > 0;

  return (
    <div className="bg-gray-100 rounded-2xl w-full h-full p-10 flex flex-col">
      {isInitialLoading && (
        <div className="w-full h-full flex items-center justify-center">
          <Spinner className="fill-teal-900 bg-inherit text-gray-300 w-10 h-10" />
        </div>
      )}

      {!isInitialLoading && (
        <>
          <header>
            <div className="flex items-center justify-between">
              <button className="flex items-center gap-2">
                <TransactionsIcon />
                <span className="text-sm text-gray-800 tracking-[-0.5px] font-medium">
                  Transações
                </span>
                <ChevronDownIcon className="text-gray-900" />
              </button>

              <button>
                <FilterIcon />
              </button>
            </div>

            <div className="mt-6 relative">
              <Swiper
                slidesPerView={3}
                centeredSlides
                mousewheel
                modules={[Mousewheel, Pagination]}
              >
                <SliderNavigation />
                {MONTHS.map((month, index) => (
                  <SwiperSlide key={month}>
                    {({ isActive }) => (
                      <SliderOption
                        index={index}
                        isActive={isActive}
                        month={month}
                      />
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </header>

          <main className="mt-4 space-y-2 flex-1 overflow-y-auto">
            {isLoading && (
              <div className="flex flex-col items-center justify-center h-full">
                <Spinner className="fill-teal-900 bg-inherit text-gray-300 w-10 h-10" />
              </div>
            )}

            {!hasTransactions && !isLoading && (
              <div className="flex flex-col items-center justify-center h-full">
                <img src={emptyStateImage} alt="Empty state" />
                <p className="text-gray-700">
                  Não encontramos nenhuma transação
                </p>
              </div>
            )}

            {hasTransactions && !isLoading && (
              <>
                <div className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4">
                  <div className="flex-1 flex items-center gap-3">
                    <CategoryIcon type="expense" />

                    <div>
                      <strong className="font-bold tracking-[-0.5px] block">
                        Almoço
                      </strong>
                      <span className="text-sm text-gray-600">04/06/2024</span>
                    </div>
                  </div>
                  <span
                    className={cn(
                      "text-red-800 tracking-[-0.5px] font-medium",
                      !areValuesVisible && "blur-[6px]"
                    )}
                  >
                    {" "}
                    - {formatCurrency(123)}
                  </span>
                </div>

                <div className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4">
                  <div className="flex-1 flex items-center gap-3">
                    <CategoryIcon type="income" />

                    <div>
                      <strong className="font-bold tracking-[-0.5px] block">
                        Salario
                      </strong>
                      <span className="text-sm text-gray-600">04/06/2024</span>
                    </div>
                  </div>
                  <span
                    className={cn(
                      "text-green-900 tracking-[-0.5px] font-medium",
                      !areValuesVisible && "blur-[6px]"
                    )}
                  >
                    {" "}
                    + {formatCurrency(5750)}
                  </span>
                </div>
              </>
            )}
          </main>
        </>
      )}
    </div>
  );
}
