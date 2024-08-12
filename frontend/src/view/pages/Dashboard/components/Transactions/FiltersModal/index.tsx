import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Button } from "@view/components/Button";
import { Modal } from "@view/components/Modal";
import { useFiltersModal } from "./useFiltersModalController";
import { cn } from "@app/utils/cn";

interface FiltersModalProps {
  open: boolean;
  onClose(): void;
  onApplyFilters(filters: {
    bankAccountId: string | undefined;
    year: number;
  }): void;
}

export function FiltersModal({
  open,
  onClose,
  onApplyFilters,
}: FiltersModalProps) {
  const {
    selectedBankAccountId,
    selectedYear,
    accounts,
    handleSelectBankAccount,
    handleChangeYear,
  } = useFiltersModal();
  return (
    <Modal open={open} onClose={onClose} title="Filtros">
      <div>
        <span className="text-lg tracking-[-1px] font-bold text-gray-800">
          Conta
        </span>
        <div className="space-y-2 mt-2">
          {accounts.map((account) => (
            <button
              onClick={() => handleSelectBankAccount(account.id)}
              key={account.id}
              className={cn(
                "p-2 rounded-2xl w-full text-left hover:bg-gray-50 transition-colors text-gray-800",
                account.id === selectedBankAccountId && "!bg-gray-200",
              )}
            >
              {account.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 text-gray-800">
        <span className="text-lg tracking-[-1px] font-bold">Ano</span>

        <div className="mt-2 w-[210px] flex items-center justify-between">
          <button className="w-12 h-12 flex items-center justify-center">
            <ChevronLeftIcon
              onClick={() => handleChangeYear(-1)}
              className="w-6 h-6"
            />
          </button>
          <div className="flex-1 text-center">
            <span className="text-sm font-medium tracking-[-0.5px]">
              {selectedYear}
            </span>
          </div>
          <button className="w-12 h-12 flex items-center justify-center">
            <ChevronRightIcon
              onClick={() => handleChangeYear(+1)}
              className="w-6 h-6"
            />
          </button>
        </div>
      </div>
      <Button
        className="w-full mt-10"
        onClick={() =>
          onApplyFilters({
            bankAccountId: selectedBankAccountId,
            year: selectedYear,
          })
        }
      >
        Aplicar filtros
      </Button>
    </Modal>
  );
}
