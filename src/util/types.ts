import { ReactElement } from "react";

export interface CategoryContainerProps {
  title: string;
  tags: TagCardProps[];
}

export interface TagCardProps {
    tagName: string;
    icon: ReactElement;
}
