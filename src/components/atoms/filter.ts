import { Filter } from "@/util/types";
import { atom } from "recoil";


export const filterAtom = atom<Filter>({
    key: "filterAtom",
    default: Filter.All
})