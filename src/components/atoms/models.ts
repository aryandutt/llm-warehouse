import { ModelInterface } from "@/util/types";
import { atom } from "recoil";

export const modelAtom = atom<ModelInterface[]>({
  key: "modelAtom1",
  default: [],
});
