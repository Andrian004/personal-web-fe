import { useEffect, useState, ReactNode } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface SearchDialogProps {
  children: ReactNode;
  triggerStyle?: string;
}

const sugestions: string[] = [
  "Nugas",
  "Skuynime",
  "Nasa Class",
  "Google Converter",
];

export function SearchDialog({ children, triggerStyle }: SearchDialogProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <Button
        size="icon"
        variant="ghost"
        className={cn("sm:hidden", triggerStyle)}
        onClick={() => setOpen(true)}
      >
        {children}
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search project..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            {sugestions.map((suggestion) => (
              <CommandItem key={suggestion} onClick={() => setOpen(false)}>
                {suggestion}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
