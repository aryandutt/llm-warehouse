import { TagCardProps } from "@/util/types";
import React from "react";
import { Card } from "../ui/card";

const TagCard: React.FC<TagCardProps> = ({ tagName, icon }) => {
  return (
    <Card>
      <div className="flex items-center p-1 gap-1">
        <div>{icon}</div>
        <div className="text-sm">{tagName}</div>
      </div>
    </Card>
  );
};

export default TagCard;
