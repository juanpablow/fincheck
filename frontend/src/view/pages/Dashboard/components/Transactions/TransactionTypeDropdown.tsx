import { DropdownMenu } from "@view/components/DropdownMenu";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { TransactionsIcon } from "@view/components/icons/TransactionsIcon";
import { IncomeIcon } from "@view/components/icons/IncomeIcon";
import { ExpensesIcon } from "@view/components/icons/ExpensesIcon";

interface TransactionTypeDropdownProps {
  onSelect(type: "income" | "expense" | undefined): void;
  selectedType: "income" | "expense" | undefined;
}

export function TransactionTypeDropdown({
  onSelect,
  selectedType,
}: TransactionTypeDropdownProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <button className="flex items-center gap-2">
          {selectedType === "income" && <IncomeIcon />}
          {selectedType === "expense" && <ExpensesIcon />}
          {selectedType === undefined && <TransactionsIcon />}
          <span className="text-sm text-gray-800 tracking-[-0.5px] font-medium">
            {selectedType === "income" && "Receitas"}
            {selectedType === "expense" && "Despesas"}
            {selectedType === undefined && "Transações"}
          </span>
          <ChevronDownIcon className="text-gray-900" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="w-[279px]">
        <DropdownMenu.Item
          className="gap-2"
          onSelect={() => onSelect("income")}
        >
          <IncomeIcon />
          Receitas
        </DropdownMenu.Item>

        <DropdownMenu.Item
          className="gap-2"
          onSelect={() => onSelect("expense")}
        >
          <ExpensesIcon />
          Despesas
        </DropdownMenu.Item>

        <DropdownMenu.Item
          className="gap-2"
          onSelect={() => onSelect(undefined)}
        >
          <TransactionsIcon />
          Transações
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
