import { cn } from "@app/utils/cn";
import { FieldError } from "./FieldError";
import { useState } from "react";
import { formatDate } from "@app/utils/formatDate";
import { Popover } from "./Popover";
import { DatePicker } from "./DatePicker";

interface DatePickerInputProps {
  className?: string;
  error?: string;
}

export function DatePickerInput({ className, error }: DatePickerInputProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div>
      <Popover.Root>
        <Popover.Trigger>
          <button
            type="button"
            className={cn(
              "bg-white w-full rounded-lg border border-gray-500 pt-4 px-3 h-[52px] text-gray-700 focus:border-gray-800 transition-all outline-none text-left relative",
              error && "!border-red-900",
              className
            )}
          >
            <span className="absolute text-xs text-gray-700 left-[13px] top-2 pointer-events-none">
              Data
            </span>
            <span>{formatDate(selectedDate)}</span>
          </button>
        </Popover.Trigger>
        <Popover.Content>
          <DatePicker
            value={selectedDate}
            onChange={(date) => setSelectedDate(date)}
          />
        </Popover.Content>
      </Popover.Root>
      <FieldError />
    </div>
  );
}