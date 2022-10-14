import React from "react";
import { BlogCardsProps } from "../interfaces/BlogCardsProps";
import { useAppSelector } from "../hook/hook";
import heart from "../../image/heart.png";

interface BlogProps {
  articles: BlogCardsProps;
}
const ArticlesPost: React.FC<BlogProps> = function () {
  const article = useAppSelector((state) => state.blog.post);
  return (
    <ul>
      <li className="articles_card">
        <div className="articles_card-wrapper">
          <div>{article.title}</div>

          <div className="articles_card-likes">
            <img className="articles_card-likes__img" src={heart} alt="" />
            <span>{article.favoritesCount}</span>
          </div>
        </div>
        <div>
          {article.tagList.map((item: any) => {
            return (
              <span key={Math.random() * 100} className="articles_card-genre">
                {item}
              </span>
            );
          })}
        </div>
        <p className="articles_card-text">{article.description}</p>
        <div className="articles_card-author">
          <div className="articles_card-info">
            <span className="articles_card-name">
              {article.author.username}
            </span>
            <span className="articles_card-date">
              {new Date(article.createdAt).toLocaleDateString("en-us", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
          <img
            className="articles_card-img"
            src={article.author.image}
            alt=""
          />
        </div>
      </li>
    </ul>
  );
};

export default ArticlesPost;
