import React from "react";
import ReactMarkdown from "react-markdown";
import { BlogCardsProps } from "../interfaces/BlogCardsProps";
import { useAppSelector } from "../hook/hook";
import heart from "../../image/heart.png";
import "./ArticlesPost.scss";

// import AviasalesCardAuthor from "../ArticlesCards/AviasalesCardAuthor";

interface BlogProps {
  article: BlogCardsProps;
}
const ArticlesPost: React.FC<BlogProps> = function () {
  const article = useAppSelector((state) => state.blog.post);

  return (
    <ul>
      <li className="articles_post">
        <div className="articles_post-wrapper">
          <div>{article?.title}</div>

          <div className="articles_post-likes">
            <img className="articles_post-likes__img" src={heart} alt="" />
            <span>{article?.favoritesCount}</span>
          </div>
        </div>

        <ReactMarkdown className="articles_post-text">
          {article?.body}
        </ReactMarkdown>
        {/* <div className="articles_card-author">
          <div className="articles_card-info">
            <span className="articles_card-name">
              {article?.author.username}
            </span>
            <span className="articles_card-date">
              {new Date(article?.createdAt).toLocaleDateString("en-us", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
          <img
            className="articles_card-img"
            src={article?.author.image}
            alt=""
          />
        </div> */}
        {/* <AviasalesCardAuthor articles={article} /> */}
      </li>
    </ul>
  );
};

export default ArticlesPost;
