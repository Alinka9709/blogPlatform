/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import "./ArticlesCards.scss";
import { Link } from "react-router-dom";

import { BlogCardsProps } from "../interfaces/BlogCardsProps";

import heart from "../../image/heart.png";

interface BlogProps {
  articles: BlogCardsProps;
}

function ArticlesCards({ articles }: BlogProps) {
  return (
    <>
      <div className="articles_card-wrapper">
        <Link to={`/articles/${articles.slug}`}>
          <div className="articles_card-title">{articles.title}</div>
        </Link>
        <div className="articles_card-likes">
          <img className="articles_card-likes__img" src={heart} alt="" />
          <span>{articles.favoritesCount}</span>
        </div>
      </div>
      <div>
        {articles.tagList.map((item) => {
          return (
            <span key={Math.random() * 100} className="articles_card-genre">
              {item}
            </span>
          );
        })}
      </div>
      <p className="articles_card-text">{articles.description}</p>
    </>
  );
}

export default ArticlesCards;
