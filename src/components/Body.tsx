import React from "react";
import TagTopBar from "./TagTopBar";
import LlmCardsWrapper from "./LlmCardsWrapper";
import { modelAtom } from "./atoms/models";
import { useRecoilValue } from "recoil";

const Body = () => {
  const models = useRecoilValue(modelAtom);
  return (
    <>
      <TagTopBar />
      <LlmCardsWrapper />
    </>
  );
};

export default Body;
