import { ReactElement } from "react";

export interface CategoryContainerProps {
  title: string;
  tags: TagCardProps[];
}

export interface TagCardProps {
    tagName: string;
    icon: ReactElement;
}

export interface LlmCardProps {
  author: string;
  avatarUrl: string;
  model: string;
  tag: string;
  likes: number;
  downloads: number;
}