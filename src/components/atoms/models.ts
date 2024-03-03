import { ModelInterface } from "@/util/types";
import { atom, selector } from "recoil";

const modelAtomSelector = selector({
  key: "modelAtomSelector1",
  get: async () => {
    const headers = new Headers();
    headers.append(
      "X-Master-Key",
      "$2a$10$pHFEUEhljnqDDsEyy1qBdO3bFvU8Gf2E9mIjOxuyy9tnOa3kYxpsK"
    );
    const response = await fetch(
      `https://api.jsonbin.io/v3/b/${process.env.NEXT_PUBLIC_BIN_ID}?meta=false`,
      {
        cache: "no-store",
        headers: headers,
      }
    );
    const data = await response.json();
    const models = data.models;
    models.sort((a: ModelInterface, b: ModelInterface) =>
      a.author.localeCompare(b.author)
    );
    return models;
  },
});

export const modelAtom = atom<ModelInterface[]>({
  key: "modelAtom1",
  default: modelAtomSelector || [],
});
