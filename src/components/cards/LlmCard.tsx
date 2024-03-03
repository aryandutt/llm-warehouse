import { LlmCardProps } from "@/util/types";
import { ArrowRight, Download, ThumbsUp } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { numberFormatter } from "@/util/numberFormatter";
import Link from "next/link";

const LlmCard: React.FC<LlmCardProps> = ({
  author,
  avatarUrl,
  likes,
  downloads,
  tag,
  model,
}) => {
  return (
    <div className="w-96 h-60 bg-white p-5 flex flex-col gap-y-5 border-[2px] border-gray-200 border-solid gap-4 rounded-xl shadow-xl transition duration-200 ease-out hover:ease-in hover:scale-[102%]">
      <div className="flex items-center gap-x-4 text-3xl font-mono ">
        <Image
          src={avatarUrl}
          alt="Logo"
          width={40}
          height={40}
          className="rounded-full"
        />
        <div>{author}</div>
      </div>
      <div className="text-xl font-sans">{model}</div>
      <div className="flex">
        <div className="text-gray-600">{tag}</div>
        <span className="px-1.5 text-gray-300">•</span>
        <div className="flex items-center gap-2">
          <ThumbsUp size={16} color="#4b5563" />
          <div className="text-gray-600">{numberFormatter(likes)}</div>
        </div>
        <span className="px-1.5 text-gray-300">•</span>
        <div className="flex items-center gap-2">
          <Download size={16} color="#4b5563" />
          <div className="text-gray-600">{numberFormatter(downloads)}</div>
        </div>
      </div>
      <Link className="w-fit" href={`/${model}`}>
        <Button className="flex w-fit gap-x-2 bg-gray-700">
          <div>Explore</div>
          <ArrowRight size={16} />
        </Button>
      </Link>
    </div>
  );
};

export default LlmCard;
