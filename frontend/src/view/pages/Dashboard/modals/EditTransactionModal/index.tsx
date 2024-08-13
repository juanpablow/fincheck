import { Modal } from "@view/components/Modal";
import { useEditTransactionModalController } from "./useEditTransactionModalController";
import { InputCurrency } from "@view/components/InputCurrency";
import { Input } from "@view/components/Input";
import { Select } from "@view/components/Select";
import { Button } from "@view/components/Button";
import { DatePickerInput } from "@view/components/DatePickerInput";
import { Controller } from "react-hook-form";
import { Transaction } from "@app/entities/Transaction";
import { ConfirmDeleteModal } from "@view/components/ConfirmDeleteModal";
import { TrashIcon } from "@view/components/icons/TrashIcon";

interface EditTransactionModalProps {
  open: boolean;
  transaction: Transaction | null;
  onClose(): void;
}

export function EditTransactionModal({
  open,
  transaction,
  onClose,
}: EditTransactionModalProps) {
  const {
    control,
    errors,
    accounts,
    categories,
    isPendingUpdate,
    isPendingDelete,
    isDeleteModalOpen,
    register,
    handleSubmit,
    handleOpenDeleteModal,
    handleDeleteTransaction,
    handleCloseDeleteModal,
  } = useEditTransactionModalController(transaction, onClose);

  const isExpense = transaction?.type === "expense";

  if (isDeleteModalOpen) {
    return (
      <ConfirmDeleteModal
        isLoading={isPendingDelete}
        onConfirm={handleDeleteTransaction}
        title={`Tem certeza que deseja excluir esta ${isExpense ? "despesa" : "receita"}?`}
        onClose={handleCloseDeleteModal}
      />
    );
  }

  return (
    <Modal
      title={isExpense ? "Editar Despesa" : "Editar Receita"}
      open={open}
      onClose={onClose}
      rightAction={
        <button onClick={handleOpenDeleteModal}>
          <TrashIcon className="w-6 h-6 text-red-900" />
        </button>
      }
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
        <Button
          type="submit"
          className="w-full mt-6"
          isLoading={isPendingUpdate}
        >
          Salvar
        </Button>
      </form>
    </Modal>
  );
}
