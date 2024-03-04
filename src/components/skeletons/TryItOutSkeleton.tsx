import React from "react";
import { Skeleton } from "../ui/skeleton";

const TryItOutSkeleton = () => {
  return (
    <div className="flex flex-col gap-20">
      <div className="flex justify-center">
        <Skeleton className="w-44 h-12 rounded-2xl" />
      </div>
      <div className="flex justify-center">
        <Skeleton className="w-11/12 h-36 rounded-3xl" />
      </div>
    </div>
  );
};

export default TryItOutSkeleton;
