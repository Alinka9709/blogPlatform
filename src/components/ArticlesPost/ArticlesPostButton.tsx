import React from "react";
import "./ArticlesPost.scss";
import { Link } from "react-router-dom";
import { BlogCardsProps } from "../interfaces/BlogCardsProps";
import { setEdit, setModal } from "../../store/getArticlesReducer";
import { useAppDispatch, useAppSelector } from "../hook/hook";

import ModalWindow from "../ModalWindow/ModalWindow";

interface ButtonProps {
  post: BlogCardsProps;
}

function ArticlesPostButton({ post }: ButtonProps) {
  const dispatch = useAppDispatch();
  const modal = useAppSelector((state) => state.blog.modal);

  const open = modal === true ? <ModalWindow /> : null;

  return (
    <>
      <div className="articles_post__container__button">
        <button
          type="button"
          className="articles_post__btn"
          onClick={() => dispatch(setModal(true))}
        >
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
      {/* <ModalWindow /> */}
      {open}
    </>
  );
}

export default ArticlesPostButton;
