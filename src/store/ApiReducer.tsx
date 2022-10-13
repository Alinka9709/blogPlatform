import { createAsyncThunk } from "@reduxjs/toolkit";
import { setPageCount } from "./getArticlesReducer";

// eslint-disable-next-line import/prefer-default-export
export const fetchPagination = createAsyncThunk(
  "articles/fetchArticles",
  async function (dispatch: any) {
    const response = await fetch("https://blog.kata.academy/api/articles");
    if (!response.ok) {
      throw new Error("Server Error!");
    }
    const data = await response.json();

    dispatch(setPageCount(data.articles));
  },
);
