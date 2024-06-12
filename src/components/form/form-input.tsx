import React from "react";
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface FormInputProps extends React.FormHTMLAttributes<HTMLInputElement> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  label?: string;
  placeholder: string;
  description?: string;
  name: string;
  type?: string;
  rootStyle?: string;
  labelStyle?: string;
  controlStyle?: string;
}

export function FormInput({
  form,
  label,
  placeholder,
  description,
  name,
  type = "text",
  rootStyle,
  labelStyle,
  controlStyle,
  ...props
}: FormInputProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={rootStyle}>
          <FormLabel className={labelStyle}>{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              type={type}
              className={controlStyle}
              {...props}
              {...field}
            />
          </FormControl>
          <FormDescription className="text-xs">{description}</FormDescription>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
}
