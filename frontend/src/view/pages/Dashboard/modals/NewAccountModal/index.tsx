import { Modal } from "@view/components/Modal";
import { useNewAccountModalController } from "./useNewAccountModalController";
import { InputCurrency } from "@view/components/InputCurrency";
import { Input } from "@view/components/Input";
import { Select } from "@view/components/Select";
import { ColorsDropdownInput } from "@view/components/ColorsDropdownInput";
import { Button } from "@view/components/Button";
import { Controller } from "react-hook-form";

export function NewAccountModal() {
  const {
    closeNewAccountModal,
    isNewAccountModalOpen,
    errors,
    handleSubmit,
    register,
    control,
    isPending,
  } = useNewAccountModalController();
  return (
    <Modal
      title="Nova conta"
      open={isNewAccountModalOpen}
      onClose={closeNewAccountModal}
    >
      <form onSubmit={handleSubmit}>
        <div>
          <span className="text-gray-600 tracking-[0.5px] text-xs">
            Saldo inicial
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-600 tracking-[0.5px] text-lg">R$</span>
          <Controller
            control={control}
            name="initialBalance"
            defaultValue="0"
            render={({ field: { onChange, value } }) => (
              <InputCurrency
                error={errors.initialBalance?.message}
                onChange={onChange}
                value={value}
              />
            )}
          />
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Nome da Conta"
            error={errors?.name?.message}
            {...register("name")}
          />
          <Controller
            control={control}
            name="type"
            defaultValue="checking"
            render={({ field: { onChange, value } }) => (
              <Select
                onChange={onChange}
                value={value}
                error={errors.type?.message}
                placeholder="Tipo"
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
            )}
          />
          <Controller
            control={control}
            name="color"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <ColorsDropdownInput
                value={value}
                onChange={onChange}
                error={errors.color?.message}
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
