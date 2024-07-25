import { PlusIcon } from "@radix-ui/react-icons";
import { DropdownMenu } from "@view/components/DropdownMenu";
import { BankAccountIcon } from "@view/components/icons/BankAccountIcon";
import { Expense } from "@view/components/icons/categories/expense/Expense";
import { Income } from "@view/components/icons/categories/income/Income";

export function Fab() {
  return (
    <div className="fixed right-4 bottom-4">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <button className="text-white bg-teal-900 w-12 h-12 rounded-full flex items-center justify-center">
            <PlusIcon className="w-6 h-6" />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content>
          <DropdownMenu.Item className="gap-2">
            <Expense />
            Nova Despesa
          </DropdownMenu.Item>

          <DropdownMenu.Item className="gap-2">
            <Income />
            Nova Receita
          </DropdownMenu.Item>

          <DropdownMenu.Item className="gap-2">
            <BankAccountIcon />
            Nova Conta
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
}
