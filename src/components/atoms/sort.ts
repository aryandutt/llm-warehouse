import { Sort } from "@/util/types";
import { atom } from "recoil";

export const sortAtom = atom<Sort>({
  key: "sortAtom",
  default: Sort.Name,
});
