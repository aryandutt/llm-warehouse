import { ModelInterface } from "@/util/types";
import { atom, selector } from "recoil";

const modelAtomSelector = selector({
  key: "modelAtomSelector1",
  get: async () => {
    const headers = new Headers();
    headers.append(
      "X-Master-Key",
      process.env.NEXT_PUBLIC_API_KEY as string
    );
    headers.append("X-JSON-Path", '$.models.*');
    const response = await fetch(
      `https://api.jsonbin.io/v3/b/${process.env.NEXT_PUBLIC_BIN_ID}?meta=false`,
      {
        cache: "no-store",
        headers: headers,
      }
    );
    const data = await response.json();
    data.sort((a: ModelInterface, b: ModelInterface) =>
      a.author.localeCompare(b.author)
    );
    return data;
  },
});

export const modelAtom = atom<ModelInterface[]>({
  key: "modelAtom1",
  default: modelAtomSelector || [],
});
