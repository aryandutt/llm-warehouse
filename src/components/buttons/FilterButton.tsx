import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Filter as FilterIcon } from "lucide-react";
import { useRecoilState } from "recoil";
import { Filter } from "@/util/types";
import { filterAtom } from "../atoms/filter";

const FilterButton = () => {
  const [filter, setFilter] = useRecoilState<Filter>(filterAtom);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="px-3 py-1 rounded-md shadow-md border-[1px] bg-white border-gray-200 border-solid flex items-center gap-2">
          <FilterIcon size={16} />
          <div className="text-sm">Filter: {filter}</div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setFilter(Filter.All)}>All</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setFilter(Filter.TextGeneration)}>text-generation</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setFilter(Filter.TextToImage)}>text-to-image</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setFilter(Filter.ImageToVideo)}>image-to-video</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default FilterButton;
