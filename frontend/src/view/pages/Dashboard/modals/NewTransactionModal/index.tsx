import { Modal } from "@view/components/Modal";
import { useNewTransactionModalController } from "./useNewTransactionModalController";
import { InputCurrency } from "@view/components/InputCurrency";
import { Input } from "@view/components/Input";
import { Select } from "@view/components/Select";
import { Button } from "@view/components/Button";
import { DatePickerInput } from "@view/components/DatePickerInput";

export function NewTransactionModal() {
  const {
    closeNewTransactionModal,
    isNewTransactionModalOpen,
    newTransactionType,
  } = useNewTransactionModalController();

  const isExpense = newTransactionType === "expense";

  return (
    <Modal
      title={isExpense ? "Nova Despesa" : "Nova Receita"}
      open={isNewTransactionModalOpen}
      onClose={closeNewTransactionModal}
    >
      <form>
        <div>
          <span className="text-gray-600 tracking-[0.5px] text-xs">
            Valor {isExpense ? "da Despesa" : "da Receita"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-600 tracking-[0.5px] text-lg">R$</span>
          <InputCurrency />
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            name="name"
            placeholder={isExpense ? "Nome da Despesa" : "Nome da Receita"}
          />
          <Select
            placeholder="Categoria"
            options={[
              {
                value: "checking",
                label: "Conta Corrente",
              },
              {
                value: "investment",
                label: "Investimentos",
              },
              {
                value: "cash",
                label: "Dinheiro físico",
              },
            ]}
          />
          <Select
            placeholder={isExpense ? "Pagar com a Conta" : "Receber na Conta"}
            options={[
              {
                value: "checking",
                label: "Conta Corrente",
              },
              {
                value: "investment",
                label: "Investimentos",
              },
              {
                value: "cash",
                label: "Dinheiro físico",
              },
            ]}
          />
          <DatePickerInput />
        </div>
        <Button type="submit" className="w-full mt-6">
          Criar
        </Button>
      </form>
    </Modal>
  );
}
