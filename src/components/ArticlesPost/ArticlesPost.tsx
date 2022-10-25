import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import { BlogCardsProps } from "../interfaces/BlogCardsProps";
import { useAppDispatch, useAppSelector } from "../hook/hook";

import "./ArticlesPost.scss";
import {
  fetchArtclesSlug,
  fetchLike,
  fetchDeleteLike,
} from "../../store/ApiReducer";
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
  const toggle = (item: any) => {
    if (!item.favorited) {
      dispatch(fetchLike(post.slug)).then(() => {
        dispatch(fetchArtclesSlug(post.slug));
      });
    } else {
      dispatch(fetchDeleteLike(post.slug)).then(() => {
        dispatch(fetchArtclesSlug(post.slug));
      });
    }
  };
  useEffect(() => {
    dispatch(fetchArtclesSlug(slug));
  }, [dispatch, slug]);

  return (
    <ul>
      <li className="articles_post">
        <div className="articles_post-wrapper">
          <div>{post.title}</div>

          <div className="articles_post-likes">
            <button
              type="button"
              className="articles_post-btn"
              onClick={() => toggle(post)}
            >
              {!post.favorited ? <span> ♡</span> : <span>❤</span>}
            </button>

            <span>{post.favoritesCount}</span>
          </div>
        </div>
        <div>
          {post.tagList &&
            post.tagList.map((item: string) => {
              return (
                <span key={Math.random() * 100} className="articles_post-tags">
                  {item}
                </span>
              );
            })}
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
