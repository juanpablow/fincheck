import { NumericFormat } from "react-number-format";
import { FieldError } from "./FieldError";
import { cn } from "@app/utils/cn";

interface InputCurrencyProps {
  error?: string;
  value?: string | number;
  onChange?(value: string): void;
}

export function InputCurrency({ error, onChange, value }: InputCurrencyProps) {
  return (
    <div>
      <NumericFormat
        thousandSeparator="."
        decimalSeparator=","
        value={value}
        onValueChange={(event) => onChange?.(event.value)}
        className={cn(
          "w-full text-gray-800 text-[32px] font-bold tracking-[-1px] outline-none",
          error && "text-red-900"
        )}
      />
      <FieldError error={error} />
    </div>
  );
}
