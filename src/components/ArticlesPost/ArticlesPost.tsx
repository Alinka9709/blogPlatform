import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import { BlogCardsProps } from "../interfaces/BlogCardsProps";
import { useAppDispatch, useAppSelector } from "../hook/hook";
import heart from "../../image/heart.png";
import "./ArticlesPost.scss";
import { fetchArtclesSkug } from "../../store/getArticlesReducer";
import AviasalesCardAuthor from "../ArticlesCards/AviasalesCardAuthor";

interface BlogProps {
  article: BlogCardsProps;
}
const ArticlesPost: React.FC<BlogProps> = function () {
  const article = useAppSelector((state) => state.blog.post);
  const dispatch = useAppDispatch();
  const { slug } = useParams();

  useEffect(() => {
    dispatch(fetchArtclesSkug(slug));
  }, [dispatch, slug]);
  return (
    <ul>
      <li className="articles_post">
        <div className="articles_post-wrapper">
          <div>{article.title}</div>

          <div className="articles_post-likes">
            <img className="articles_post-likes__img" src={heart} alt="" />
            <span>{article.favoritesCount}</span>
          </div>
        </div>

        <ReactMarkdown className="articles_post-text">
          {article.body}
        </ReactMarkdown>

        {article.author && <AviasalesCardAuthor articles={article} />}
      </li>
    </ul>
  );
};

export default ArticlesPost;
