import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const SortButton = () => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="border-[1px] border-gray-200 border-solid px-3 py-1 rounded-md shadow-md">
          <div className="text-sm">Sort: None</div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>None</DropdownMenuItem>
          <DropdownMenuItem>Likes</DropdownMenuItem>
          <DropdownMenuItem>Downloads</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default SortButton;
