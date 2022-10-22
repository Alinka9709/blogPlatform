import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import { BlogCardsProps } from "../interfaces/BlogCardsProps";
import { useAppDispatch, useAppSelector } from "../hook/hook";
import heart from "../../image/heart.png";
import "./ArticlesPost.scss";
import { fetchArtclesSkug } from "../../store/getArticlesReducer";
import AviasalesCardAuthor from "../ArticlesCards/AviasalesCardAuthor";
import ArticlesPostButton from "./ArticlesPostButton";

interface BlogProps {
  post: BlogCardsProps;
}
const ArticlesPost: React.FC<BlogProps> = function () {
  const { post, status } = useAppSelector((state) => state.blog);

  const dispatch = useAppDispatch();
  const username = localStorage.getItem("username");
  const { slug } = useParams();

  useEffect(() => {
    dispatch(fetchArtclesSkug(slug));
  }, [dispatch, slug]);
  return (
    <ul>
      <li className="articles_post">
        <div className="articles_post-wrapper">
          <div>{post.title}</div>

          <div className="articles_post-likes">
            <img className="articles_post-likes__img" src={heart} alt="" />
            <span>{post.favoritesCount}</span>
          </div>
        </div>

        <ReactMarkdown className="articles_post-text">
          {post.body}
        </ReactMarkdown>

        {post.author && <AviasalesCardAuthor articles={post} />}

        {post.author && post.author.username === username && status ? (
          <ArticlesPostButton post={post} />
        ) : null}
      </li>
    </ul>
  );
};

export default ArticlesPost;
