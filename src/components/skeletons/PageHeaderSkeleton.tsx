import React from "react";
import { Skeleton } from "../ui/skeleton";
import PageHeaderWrapper from "../PageHeaderWrapper";

const PageHeaderSkeleton = () => {
  return (
    <PageHeaderWrapper>
      <div className="flex gap-3 items-center">
        <Skeleton className="rounded-full w-12 h-12" />
        <Skeleton className="rounded-md w-60 h-8" />
      </div>
      <Skeleton className="w-44 h-6" />
    </PageHeaderWrapper>
  );
};

export default PageHeaderSkeleton;
