/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import "./ArticlesCards.scss";
import { Link } from "react-router-dom";
import { BlogCardsProps } from "../interfaces/BlogCardsProps";
import { fetchArtclesSkug } from "../../store/getArticlesReducer";
import { useAppDispatch } from "../hook/hook";
import heart from "../../image/heart.png";

interface BlogProps {
  articles: BlogCardsProps;
}

function ArticlesCards({ articles }: BlogProps) {
  const dispatch = useAppDispatch();
  return (
    <>
      <div className="articles_card-wrapper">
        <Link to="/articles/:slug">
          <div
            className="articles_card-title"
            onClick={() => dispatch(fetchArtclesSkug(articles.slug))}
          >
            {articles.title}
          </div>
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
        <img className="articles_card-img" src={articles.author.image} alt="" />
      </div>
    </>
  );
}

export default ArticlesCards;
