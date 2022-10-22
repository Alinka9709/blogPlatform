import React from "react";
import "./BlogHeaderAuthorised.scss";
import { Link } from "react-router-dom";
import img from "../../image/Rectangle 1.png";
import { useAppDispatch } from "../hook/hook";
import { oauth, setEdit } from "../../store/getArticlesReducer";

function BlogHeaderAuthorised() {
  const name = localStorage.getItem("username");
  const dispatch = useAppDispatch();
  const remove = () => {
    localStorage.clear();
    dispatch(oauth(false));
  };

  return (
    <div className="blog-header-authorised">
      <Link to="/">
        <div className="blog-header-authorised-title__wrapper">
          <span className="blog-header-authorised-text">Realworld Blog </span>
        </div>
      </Link>
      <div className="blog-header-authorised-button__wrapper">
        <Link to="/new-article">
          <button
            type="button"
            onClick={() => dispatch(setEdit(false))}
            className="blog-header-authorised-btn"
          >
            Create article
          </button>
        </Link>
        <div className="blog-header-authorised__profile">
          <span className="blog-header-authorised-name">{name}</span>

          <Link to="/profile">
            <img className="blog-header-authorised-img" src={img} alt="" />
          </Link>
        </div>
        <button
          type="button"
          className="blog-header-authorised-btn"
          onClick={() => remove()}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

export default BlogHeaderAuthorised;
