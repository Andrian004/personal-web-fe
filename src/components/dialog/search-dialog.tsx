import {
  useEffect,
  useState,
  ReactNode,
  FormEvent,
  KeyboardEvent as ReactKeyboardEvent,
} from "react";
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
  onSearchSubmit: (value: string, e?: FormEvent | undefined) => void;
}

const suggestions: string[] = [
  "Nugas",
  "Skuynime",
  "Nasa Class",
  "Google Converter",
];

export function SearchDialog({
  children,
  triggerStyle,
  onSearchSubmit,
}: SearchDialogProps) {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleKeydown = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearchSubmit(searchValue);
      setOpen(false);
    }
  };

  const handleSelect = (value: string) => {
    onSearchSubmit(value);
    setOpen(false);
  };

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
        <CommandInput
          placeholder="Search project..."
          onValueChange={(search) => setSearchValue(search)}
          onKeyDown={handleKeydown}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            {suggestions.map((suggestion) => (
              <CommandItem key={suggestion} onSelect={handleSelect}>
                {suggestion}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
