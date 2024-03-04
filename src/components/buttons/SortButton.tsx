import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useRecoilState } from "recoil";
import { sortAtom } from "../atoms/sort";
import { Sort } from "@/util/types";
import { ArrowDownUp } from "lucide-react";

const SortButton = () => {
  const [sort, setSort] = useRecoilState<Sort>(sortAtom);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="border-[1px] border-gray-200 bg-white border-solid px-3 py-1 rounded-md shadow-md flex items-center gap-2">
          <ArrowDownUp size={16} />
          <div className="text-sm">Sort: {sort}</div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setSort(Sort.Name)}>
            Name
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSort(Sort.Likes)}>
            Likes
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSort(Sort.Downloads)}>
            Downloads
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default SortButton;
