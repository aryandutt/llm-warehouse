import { ModelInterface } from "@/util/types";
import { atom, selector } from "recoil";

const modelAtomSelector = selector({
  key: "modelAtomSelector1",
  get: async () => {
    try {
      const headers = new Headers();
      headers.append(
        "X-Master-Key",
        process.env.NEXT_PUBLIC_API_KEY as string
      );
      headers.append("X-JSON-Path", '$.models.*');
      const response = await fetch(
        `https://api.jsonbin.io/v3/b/${process.env.NEXT_PUBLIC_BIN_ID}?meta=false`,
        {
          headers: headers,
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch models");
      }
      const data = await response.json();
      data.sort((a: ModelInterface, b: ModelInterface) =>
        a.author.localeCompare(b.author)
      );
      return data;
    } catch (error) {
      console.error("Error fetching models:", error);
      throw error;
    }
  },
});

export const modelAtom = atom<ModelInterface[]>({
  key: "modelAtom1",
  default: modelAtomSelector || [],
});
