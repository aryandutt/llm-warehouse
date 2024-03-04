import { ReactElement } from "react";

export enum Sort {
  Name = "Name",
  Likes = "Likes",
  Downloads = "Downloads",
}

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

export interface ModelInterface {
  author: string;
  avatarUrl: string;
  downloads: number;
  likes: number;
  model: string;
  tag: string;
}

export interface ModelPageInterface {
  author: string;
  avatarUrl: string;
  downloads: number;
  likes: number;
  tag: string;
  api: string;
  content: {text: string, title: string}[];
}

export interface PageHeaderInterface {
  avatarUrl: string;
  author: string;
  model: string;
  likes: number;
  downloads: number;
  tag: string;
}

export enum Tags {
  TextToImage = "text-to-image",
  TextGeneration = "text-generation",
  ImageToVideo = "image-to-video"
}