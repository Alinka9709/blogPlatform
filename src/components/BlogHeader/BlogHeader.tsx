import React from "react";
import "./BlogHeader.scss";

function BlogHeader() {
  return (
    <div className="blog-header">
      <div className="blog-header-title__wrapper">
        <span className="blog-header-text">Realworld Blog </span>
      </div>
      <div className="blog-header-button__wrapper">
        <button type="button" className="blog-header-btn">
          Sign In
        </button>
        <button type="button" className="blog-header-btn">
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default BlogHeader;
