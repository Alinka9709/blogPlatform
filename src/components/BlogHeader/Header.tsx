/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hook/hook";
import { fetchArticles } from "../../store/ApiReducer";
import { oauth } from "../../store/getArticlesReducer";
import BlogHeaderAuthorised from "./BlogHeaderAuthorised";
import BlogHeader from "./BlogHeader";

function Header() {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.blog);
  const token = localStorage.getItem("token");
  useEffect(() => {
    dispatch(fetchArticles());
    if (token) {
      dispatch(oauth(true));
    }
  }, [dispatch, token]);
  return <>{status ? <BlogHeaderAuthorised /> : <BlogHeader />}</>;
}

export default Header;
