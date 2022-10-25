import "./ArticlesCards.scss";
import React from "react";
import { Link } from "react-router-dom";
import {
  fetchLike,
  fetchDeleteLike,
  fetchArticles,
} from "../../store/ApiReducer";
import { BlogCardsProps } from "../interfaces/BlogCardsProps";
import { useAppDispatch } from "../hook/hook";

interface BlogProps {
  articles: BlogCardsProps;
}

function ArticlesCards({ articles }: BlogProps) {
  const dispatch = useAppDispatch();

  const toggle = (item: any) => {
    if (!item.favorited) {
      dispatch(fetchLike(articles.slug)).then(() => {
        dispatch(fetchArticles());
      });
    }
    if (item.favorited) {
      dispatch(fetchDeleteLike(articles.slug)).then(() => {
        dispatch(fetchArticles());
      });
    }
  };
  return (
    <>
      <div className="articles_card-wrapper">
        <Link to={`/articles/${articles.slug}`}>
          <div className="articles_card-title">{articles.title}</div>
        </Link>
        <div className="articles_card-likes">
          <button
            type="button"
            className="articles_card-btn"
            onClick={() => toggle(articles)}
          >
            {!articles.favorited ? <span> ♡</span> : <span>❤</span>}
          </button>
          <span>{articles.favoritesCount}</span>
        </div>
      </div>
      <div>
        {articles.tagList.map((item) => {
          return (
            <span key={Math.random() * 100} className="articles_card-tags">
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
