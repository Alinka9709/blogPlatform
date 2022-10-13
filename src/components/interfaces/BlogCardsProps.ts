import { BlogAuthorProps } from "./BlogAuthorProps";

export interface BlogCardsProps {
  author: BlogAuthorProps;
  body: string;
  createdAt: string;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  tagList: string[];
  title: string;
  updatedAt: number;
}
