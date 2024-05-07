import { UseFormReturn } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useState } from "react";

interface FormInputProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  label: string;
  placeholder: string;
  description?: string;
  name: string;
  type?: string;
}

export function FormPassword({
  form,
  label,
  placeholder,
  description,
  name,
}: FormInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="flex justify-center bg-white dark:bg-gray-950 rounded-md">
              <Input
                className="bg-transparent output-none border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder={placeholder}
                type={showPassword ? "text" : "password"}
                {...field}
              />
              <Button
                type="button"
                className="rounded-l-none bg-sky-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </Button>
            </div>
          </FormControl>
          <FormDescription className="text-xs">{description}</FormDescription>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
}
