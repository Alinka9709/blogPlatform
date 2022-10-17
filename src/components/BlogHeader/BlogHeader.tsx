import React from "react";
import { Link } from "react-router-dom";
import "./BlogHeader.scss";

function BlogHeader() {
  return (
    <div className="blog-header">
      <Link to="/">
        <div className="blog-header-title__wrapper">
          <span className="blog-header-text">Realworld Blog </span>
        </div>
      </Link>
      <div className="blog-header-button__wrapper">
        <Link to="/sign-in">
          <button type="button" className="blog-header-btn">
            Sign In
          </button>
        </Link>
        <Link to="/sign-up">
          <button type="button" className="blog-header-btn">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
}

export default BlogHeader;
