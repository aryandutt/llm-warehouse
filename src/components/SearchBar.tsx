import React from "react";
import { Input } from "./ui/input";

const SearchBar = () => {
  return (
    <>
      <Input
        type="search"
        className="p-3 shadow-inner border-[1px] border-gray-200 border-solid focus:outline-none focus:shadow-md"
        placeholder="Search Model"
      />
    </>
  );
};

export default SearchBar;
