import { ChangeEventHandler } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface FormTextareaProps {
  id: string;
  label: string;
  placeholder?: string;
  rootStyle?: string;
  labelStyle?: string;
  textareaStyle?: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement> | undefined;
}

export function FormTextarea({
  id,
  label,
  placeholder,
  rootStyle,
  labelStyle,
  textareaStyle,
  onChange,
}: FormTextareaProps) {
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
      <Textarea
        id={id}
        placeholder={placeholder}
        className={cn(
          "text-lg bg-neutral-200 dark:bg-neutral-900",
          textareaStyle
        )}
        onChange={onChange}
      />
    </div>
  );
}
