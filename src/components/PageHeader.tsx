import { numberFormatter } from "@/util/numberFormatter";
import { PageHeaderInterface } from "@/util/types";
import { Download, ThumbsUp } from "lucide-react";
import Image from "next/image";
import React from "react";
import PageHeaderWrapper from "./PageHeaderWrapper";

const PageHeader: React.FC<PageHeaderInterface> = ({
  avatarUrl,
  author,
  model,
  likes,
  downloads,
  tag,
}) => {
  return (
    <PageHeaderWrapper>
      <div className="flex items-center gap-2">
        <Image
          src={avatarUrl}
          alt="Logo"
          width={30}
          height={30}
          className="rounded-full"
        />
        <div className="font-semibold text-2xl text-gray-600">{author}</div>
        <div className="font-light text-2xl text-gray-600">/</div>
        <div className="font-mono font-medium text-xl">{model}</div>
      </div>
      <div className="flex gap-3 ">
        <div className="text-gray-600">{tag}</div>
        <div className="flex items-center gap-2">
          <Download size={16} color="#4b5563" />
          <div className="text-gray-600">
            {numberFormatter(downloads as number)}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ThumbsUp size={16} color="#4b5563" />
          <div className="text-gray-600">
            {numberFormatter(likes as number)}
          </div>
        </div>
      </div>
    </PageHeaderWrapper>
  );
};

export default PageHeader;
