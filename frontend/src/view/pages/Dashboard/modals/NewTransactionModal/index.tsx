import { Modal } from "@view/components/Modal";
import { useNewTransactionModalController } from "./useNewTransactionModalController";
import { InputCurrency } from "@view/components/InputCurrency";
import { Input } from "@view/components/Input";
import { Select } from "@view/components/Select";
import { Button } from "@view/components/Button";
import { DatePickerInput } from "@view/components/DatePickerInput";
import { Controller } from "react-hook-form";

export function NewTransactionModal() {
  const {
    closeNewTransactionModal,
    isNewTransactionModalOpen,
    newTransactionType,
    control,
    errors,
    accounts,
    categories,
    isPending,
    register,
    handleSubmit,
  } = useNewTransactionModalController();

  const isExpense = newTransactionType === "expense";

  return (
    <Modal
      title={isExpense ? "Nova Despesa" : "Nova Receita"}
      open={isNewTransactionModalOpen}
      onClose={closeNewTransactionModal}
    >
      <form onSubmit={handleSubmit}>
        <div>
          <span className="text-gray-600 tracking-[0.5px] text-xs">
            Valor {isExpense ? "da Despesa" : "da Receita"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-600 tracking-[0.5px] text-lg">R$</span>
          <Controller
            control={control}
            name="value"
            defaultValue="0"
            render={({ field: { onChange, value } }) => (
              <InputCurrency
                error={errors.value?.message}
                onChange={onChange}
                value={value}
              />
            )}
          />
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            placeholder={isExpense ? "Nome da Despesa" : "Nome da Receita"}
            error={errors.name?.message}
            {...register("name")}
          />

          <Controller
            control={control}
            name="categoryId"
            render={({ field: { onChange, value } }) => (
              <Select
                onChange={onChange}
                value={value}
                error={errors.categoryId?.message}
                placeholder="Categoria"
                options={categories.map((category) => ({
                  value: category.id,
                  label: category.name,
                }))}
              />
            )}
          />

          <Controller
            control={control}
            name="bankAccountId"
            render={({ field: { onChange, value } }) => (
              <Select
                onChange={onChange}
                value={value}
                error={errors.bankAccountId?.message}
                placeholder={
                  isExpense ? "Pagar com a Conta" : "Receber na Conta"
                }
                options={accounts.map((account) => ({
                  value: account.id,
                  label: account.name,
                }))}
              />
            )}
          />

          <Controller
            control={control}
            name="date"
            defaultValue={new Date()}
            render={({ field: { value, onChange } }) => (
              <DatePickerInput
                value={value}
                onChange={onChange}
                error={errors.date?.message}
              />
            )}
          />
        </div>
        <Button type="submit" className="w-full mt-6" isLoading={isPending}>
          Criar
        </Button>
      </form>
    </Modal>
  );
}
