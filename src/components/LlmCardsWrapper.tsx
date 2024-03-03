"use client";

import React, { useEffect } from "react";
import LlmCard from "./cards/LlmCard";
import { useRecoilState, useRecoilValue } from "recoil";
import { modelAtom } from "./atoms/models";
import { sortAtom } from "./atoms/sort";
import { ModelInterface, Sort } from "@/util/types";

const LlmCardsWrapper = () => {
  const [models, setModels] = useRecoilState<ModelInterface[]>(modelAtom);
  const sort = useRecoilValue<Sort>(sortAtom);

  console.log(models);

  useEffect(() => {
    if (sort === Sort.Likes) {
      setModels((prevModels: ModelInterface[]) => {
        const sortedModels = [...prevModels];
        sortedModels.sort((a, b) => b.likes - a.likes);
        return sortedModels;
      });
    } else if (sort === Sort.Downloads) {
      setModels((prevModels: ModelInterface[]) => {
        const sortedModels = [...prevModels];
        sortedModels.sort((a, b) => b.downloads - a.downloads);
        return sortedModels;
      });
    } else if (sort === Sort.Name) {
      setModels((prevModels: ModelInterface[]) => {
        const sortedModels = [...prevModels];
        sortedModels.sort((a, b) => a.author.localeCompare(b.author));
        return sortedModels;
      });
    }
  }, [sort]);

  return (
    <div className="flex justify-center">
      <div className="pt-10 pb-20 grid gap-x-20 gap-y-10 grid-cols-3">
        {models.map((model: ModelInterface, index: number) => (
          <LlmCard
            key={index}
            author={model.author}
            avatarUrl={model.avatarUrl}
            likes={model.likes}
            downloads={model.downloads}
            tag={model.tag}
            model={model.model}
          />
        ))}
      </div>
    </div>
  );
};

export default LlmCardsWrapper;
