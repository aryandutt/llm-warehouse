import React from "react";
import SearchBar from "./SearchBar";
import SortButton from "./buttons/SortButton";
import FilterButton from "./buttons/FilterButton";
import { useRecoilValue } from "recoil";
import { modelAtom } from "./atoms/models";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";

const ModelsTopBar = () => {
  const models = useRecoilValue(modelAtom);
  return (
    <div className="pt-8 px-8 flex w-100vw justify-between items-baseline">
      <div className="flex gap-10 items-center">
        <div className="flex items-center gap-4">
          <div className="text-2xl from-stone-700 font-mono">Models</div>
          <Dialog>
            <DialogTrigger>
              <Button className="w-fit h-7 rounded-full bg-slate-800 flex gap-1 items-center justify-center shadow-sm shadow-slate-400">
                <Plus size={18} strokeWidth="2px" color="white" />
                <div>Add Model</div>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex justify-center">
                  Add Model
                </DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-6 py-4">
                <div className="flex items-center gap-4">
                  <div className="font-light text-lg">Name</div>
                  <Input
                    placeholder="Enter model name"
                    className="p-4 shadow-inner h-8 rounded-full border-[2px] border-gray-300 border-solid focus:outline-none focus:shadow-md"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <div className="font-light text-lg">Description</div>
                  <Input
                    placeholder="Enter model description"
                    className="p-4 shadow-inner h-8 rounded-full border-[2px] border-gray-300 border-solid focus:outline-none focus:shadow-md "
                  />
                </div>
                <div className="flex gap-4">
                  <div className="font-light text-lg">Upload Zip</div>
                  <Input type="file" className="" />
                </div>
                <div className="flex gap-4">
                  <Button className="px-7">
                    <div>Add</div>
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <SearchBar />
      <div className="flex gap-5">
        <SortButton />
        <FilterButton />
      </div>
    </div>
  );
};

export default ModelsTopBar;
