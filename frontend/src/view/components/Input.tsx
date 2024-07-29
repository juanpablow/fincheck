import { ComponentProps, forwardRef, useState } from "react";
import { cn } from "@app/utils/cn";
import { FieldError } from "./FieldError";

interface InputProps extends ComponentProps<"input"> {
  name: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, placeholder, name, id, error, className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputId = id ?? name;

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className="relative">
        <input
          {...props}
          ref={ref}
          name={name}
          id={inputId}
          type={type === "password" && showPassword ? "text" : type}
          placeholder=" "
          className={cn(
            "bg-white w-full rounded-lg border border-gray-500 px-3 h-[52px] text-gray-800 pt-4 peer placeholder-shown:pt-0 focus:border-gray-800 transition-all outline-none",
            error && "!border-red-900",
            className
          )}
        />
        <label
          htmlFor={inputId}
          className="absolute text-xs left-[13px] top-2 pointer-events-none text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 transition-all"
        >
          {placeholder}
        </label>
        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute top-1 end-0 p-3.5 rounded-e-md border-none"
          >
            <svg
              className="flex-shrink-0 size-4 text-gray-400 dark:text-neutral-600"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                className={!showPassword ? "block" : "hidden"}
                d="M9.88 9.88a3 3 0 1 0 4.24 4.24"
              />
              <path
                className={!showPassword ? "block" : "hidden"}
                d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
              />
              <path
                className={!showPassword ? "block" : "hidden"}
                d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
              />
              <line
                className={!showPassword ? "block" : "hidden"}
                x1="2"
                x2="22"
                y1="2"
                y2="22"
              />
              <path
                className={showPassword ? "block" : "hidden"}
                d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
              />
              <circle
                className={showPassword ? "block" : "hidden"}
                cx="12"
                cy="12"
                r="3"
              />
            </svg>
          </button>
        )}
        <FieldError error={error} />
      </div>
    );
  }
);
