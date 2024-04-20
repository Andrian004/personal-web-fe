import { FormEvent, useState } from "react";
import { Search, AlignLeft, EllipsisVertical } from "lucide-react";
import { ProfileDialog } from "@/components/dialog/profile-dialog";
import { NavDialog } from "@/components/dialog/nav-dialog";
import { Button } from "@/components/ui/button";
import { SearchDialog } from "@/components/dialog/search-dialog";

interface SearchHeaderProps {
  title: string;
}

export function SearchHeader({ title }: SearchHeaderProps) {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (e: FormEvent) => {
    e.preventDefault();
    console.log(searchValue);
  };

  return (
    <>
      <div className="flex items-center gap-x-2">
        <ProfileDialog triggerStyle="lg:hidden mr-2">
          <AlignLeft />
        </ProfileDialog>
        <h1 className="text-2xl font-medium">{title}</h1>
      </div>
      <div className="flex gap-x-2 sm:gap-x-3 md:gap-x-0">
        <form
          onSubmit={handleSearchChange}
          className="hidden sm:flex items-center bg-white rounded-2xl h-8"
        >
          <input
            type="text"
            className="h-full bg-transparent focus:outline-none focus-visible:outline-0 pl-3 pr-0 py-2"
            placeholder="Search project..."
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            className="p-0 m-0 w-8 h-8 bg-transparent hover:bg-transparent hover:text-sky-500"
          >
            <Search className="w-5 h-5" />
          </Button>
        </form>
        <SearchDialog>
          <Search />
        </SearchDialog>
        <NavDialog triggerStyle="md:hidden">
          <EllipsisVertical />
        </NavDialog>
      </div>
    </>
  );
}
