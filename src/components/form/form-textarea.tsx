import { UseFormReturn } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { cn } from "@/lib/utils";

interface FormTextareaProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
  rootStyle?: string;
  labelStyle?: string;
  textareaStyle?: string;
}

export function FormTextarea({
  form,
  name,
  label,
  placeholder,
  description,
  rootStyle,
  labelStyle,
  textareaStyle,
}: FormTextareaProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={rootStyle}>
          <FormLabel className={labelStyle}>{label}</FormLabel>
          <FormControl>
            <Textarea
              placeholder={placeholder}
              className={cn("resize-none", textareaStyle)}
              {...field}
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
