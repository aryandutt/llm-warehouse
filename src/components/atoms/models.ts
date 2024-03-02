import { ModelInterface } from "@/util/types";
import { atom, selector } from "recoil";

const modelAtomSelector = selector({
  key: "modelAtomSelector",
  get: async () => {
    const response = await fetch(
      "https://my-json-server.typicode.com/aryandutt/llm-models/models"
    );
    const data = await response.json();
    data.sort((a: any, b: any) => a.author.localeCompare(b.author));
    return data;
  },
});

export const modelAtom = atom<ModelInterface[]>({
  key: "modelAtom",
  default: modelAtomSelector,
});
