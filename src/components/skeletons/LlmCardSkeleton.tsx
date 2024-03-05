import React from "react";
import { Skeleton } from "../ui/skeleton";

const LlmCardSkeleton = () => {
  return (
    <div className="w-96 h-60 bg-white p-5 flex flex-col gap-y-5 border-[2px] border-gray-200 border-solid gap-4 rounded-xl shadow-xl">
      <div className="flex gap-3 items-center">
        <Skeleton className="rounded-full w-12 h-12" />
        <Skeleton className="w-28 h-8" />
      </div>
      <Skeleton className="w-32 h-6" />
      <Skeleton className="w-56 h-6" />
      <Skeleton className="w-28 h-11" />
    </div>
  );
};

export default LlmCardSkeleton;
