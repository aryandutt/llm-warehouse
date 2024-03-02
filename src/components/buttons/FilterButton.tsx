import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const FilterButton = () => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="px-3 py-1 rounded-md shadow-md border-[1px] bg-white border-gray-200 border-solid">
          <div className="text-sm">Filter: None</div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>All</DropdownMenuItem>
          <DropdownMenuItem>Text-to-Text</DropdownMenuItem>
          <DropdownMenuItem>Text-to-Image</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default FilterButton;
