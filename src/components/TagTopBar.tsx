import React from "react";
import SearchBar from "./SearchBar";
import SortButton from "./buttons/SortButton";
import FilterButton from "./buttons/FilterButton";
import { useRecoilValue } from "recoil";
import { modelAtom } from "./atoms/models";

const TagTopBar = () => {
  const models = useRecoilValue(modelAtom);
  return (
    <div className="pt-8 px-8 flex w-100vw justify-between items-baseline">
      <div className="flex gap-8 items-center">
        <div className="flex items-baseline gap-2">
          <div className="text-2xl from-stone-700 font-mono">Models</div>
          <div className="text-sm from-stone-700 font-mono">
            {models.length}
          </div>
        </div>
        <SearchBar />
      </div>
      <div className="flex gap-5">
        <SortButton />
        <FilterButton />
      </div>
    </div>
  );
};

export default TagTopBar;
