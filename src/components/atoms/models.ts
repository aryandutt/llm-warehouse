import { atom, selector } from "recoil";

const modelAtomSelector = selector({
  key: "modelAtomSelector",
  get: async () => {
    const response = await fetch(
      "https://my-json-server.typicode.com/aryandutt/llm-models/models"
    );
    const data = await response.json();
    return data;
  },
});

export const modelAtom = atom({
  key: "modelAtom",
  default: modelAtomSelector,
});
