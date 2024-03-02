import React from "react";
import LlmCard from "./cards/LlmCard";
import { useRecoilValue } from "recoil";
import { modelAtom } from "./atoms/models";

const LlmCardsWrapper = () => {
  const models = useRecoilValue(modelAtom);
  return (
    <div className="flex justify-center">
      <div className="pt-10 pb-20 grid gap-x-20 gap-y-10 grid-cols-3">
        {models.map((model: any, index: number) => (
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
