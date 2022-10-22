import React from "react";
import "./ArticlesPost.scss";
import { Link } from "react-router-dom";
import { BlogCardsProps } from "../interfaces/BlogCardsProps";
import { setEdit } from "../../store/getArticlesReducer";
import { useAppDispatch } from "../hook/hook";

interface ButtonProps {
  post: BlogCardsProps;
}

function ArticlesPostButton({ post }: ButtonProps) {
  const dispatch = useAppDispatch();
  return (
    <div className="articles_post__container__button">
      <button type="button" className="articles_post__btn">
        Delete
      </button>
      <Link to={`/new-article/${post.slug}/edit`}>
        <button
          type="button"
          onClick={() => dispatch(setEdit(true))}
          className="articles_post__btn"
        >
          Edit
        </button>
      </Link>
    </div>
  );
}

export default ArticlesPostButton;
