import React from "react";
import ArticlesCards from "../ArticlesCards/ArticlesCards";
import { useAppSelector } from "../hook/hook";
import { BlogCardsProps } from "../interfaces/BlogCardsProps";

function ArticlesList() {
  const articl = useAppSelector((state) => state.blog.articles);
  return (
    <ul>
      {articl.map((articles: BlogCardsProps) => {
        return (
          <li className="articles_card" key={Math.random() * 500}>
            <ArticlesCards articles={articles} />
          </li>
        );
      })}
    </ul>
  );
}

export default ArticlesList;
