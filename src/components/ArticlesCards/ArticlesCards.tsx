import "./ArticlesCards.scss";
import { BlogCardsProps } from "../interfaces/BlogCardsProps";
import heart from "../../image/heart.png";

interface BlogProps {
  articles: BlogCardsProps;
}

function ArticlesCards({ articles }: BlogProps) {
  return (
    <>
      <div className="articles_card-wrapper">
        <div className="articles_card-title">{articles.title}</div>
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
