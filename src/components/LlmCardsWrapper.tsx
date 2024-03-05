"use client";
import React, { useEffect, useState } from "react";
import LlmCard from "./cards/LlmCard";
import { useRecoilState, useRecoilValue } from "recoil";
import { modelAtom } from "./atoms/models";
import { sortAtom } from "./atoms/sort";
import { Filter, ModelInterface, Sort } from "@/util/types";
import { filterAtom } from "./atoms/filter";
import LlmCardSkeleton from "./skeletons/LlmCardSkeleton";

const LlmCardsWrapper = () => {
  const [models, setModels] = useRecoilState<ModelInterface[]>(modelAtom);
  const [loading, setLoading] = useState<boolean>(true);
  const sort = useRecoilValue<Sort>(sortAtom);
  const filter = useRecoilValue<Filter>(filterAtom);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const headers = new Headers();
        headers.append(
          "X-Master-Key",
          process.env.NEXT_PUBLIC_API_KEY as string
        );
        headers.append("X-JSON-Path", "$.models.*");
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
        setModels(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching models:", error);
        throw error;
      }
    };
    fetchModels();
  }, []);

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
        {loading
          ? Array.from({ length: 9 }).map((_, index) => (
              <LlmCardSkeleton key={index} />
            ))
          : models
              ?.filter((model) => {
                if (filter === Filter.All) {
                  return model;
                }
                return model.tag === filter;
              })
              .map((model: ModelInterface, index: number) => (
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
