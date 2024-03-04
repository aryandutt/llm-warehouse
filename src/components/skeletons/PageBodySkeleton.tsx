import React from "react";
import { Skeleton } from "../ui/skeleton";

const PageBodySkeleton = () => {
  return (
    <>
      <Skeleton className="w-1/2 h-8 rounded-xl" />
      <Skeleton className="w-auto h-72 rounded-3xl" />
      <Skeleton className="w-1/2 h-8 rounded-xl" />
      <Skeleton className="w-auto h-72 rounded-3xl" />
    </>
  );
};

export default PageBodySkeleton;
