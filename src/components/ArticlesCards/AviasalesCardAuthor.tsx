import React from "react";
import { BlogCardsProps } from "../interfaces/BlogCardsProps";

interface AuthorProps {
  articles: BlogCardsProps;
}
function AviasalesCardAuthor({ articles }: AuthorProps) {
  return (
    <div className="articles_card-author">
      <div className="articles_card-info">
        <span className="articles_card-name">{articles.author.username}</span>
        <span className="articles_card-date">
          {new Date(articles.createdAt).toLocaleDateString("en-us", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>
      <img className="articles_card-img" src={articles.author?.image} alt="" />
    </div>
  );
}

export default AviasalesCardAuthor;
