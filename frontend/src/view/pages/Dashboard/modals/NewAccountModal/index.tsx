import { Modal } from "@view/components/Modal";
import { useNewAccountModalController } from "./useNewAccountModalController";
import { InputCurrency } from "@view/components/InputCurrency";
import { Input } from "@view/components/Input";
import { Select } from "@view/components/Select";
import { ColorsDropdownInput } from "@view/components/ColorsDropdownInput";
import { Button } from "@view/components/Button";

export function NewAccountModal() {
  const { closeNewAccountModal, isNewAccountModalOpen } =
    useNewAccountModalController();
  return (
    <Modal
      title="Nova conta"
      open={isNewAccountModalOpen}
      onClose={closeNewAccountModal}
    >
      <form>
        <div>
          <span className="text-gray-600 tracking-[0.5px] text-xs">Saldo</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-600 tracking-[0.5px] text-lg">R$</span>
          <InputCurrency />
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <Input type="text" name="name" placeholder="Nome da Conta" />
          <Select
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
          <ColorsDropdownInput />
        </div>
        <Button type="submit" className="w-full mt-6">
          Criar
        </Button>
      </form>
    </Modal>
  );
}
