import { ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface FormInputProps {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  inputStyle?: string;
  labelStyle?: string;
  rootStyle?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function FormInput({
  label,
  id,
  type = "text",
  placeholder,
  inputStyle,
  labelStyle,
  rootStyle,
  onChange,
}: FormInputProps) {
  return (
    <div className={cn("space-y-2", rootStyle)}>
      <label
        htmlFor={id}
        className={cn(
          "text-lg lg:text-xl after:content-['*'] after:text-red-600",
          labelStyle
        )}
      >
        {label}
      </label>
      <Input
        id={id}
        type={type}
        className={cn("text-lg bg-neutral-200", inputStyle)}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}
