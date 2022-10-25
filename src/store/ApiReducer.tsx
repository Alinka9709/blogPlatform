import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  IFormInputs,
  IFormArtickeInputs,
} from "../components/interfaces/IFormInputs";

export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async function () {
    const token = localStorage.getItem("token");
    const response = await fetch("https://blog.kata.academy/api/articles", {
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Server Error!");
    }
    const data = await response.json();

    return data.articles;
  },
);

export const fetchPagination = createAsyncThunk(
  "articles/fetchPagination",
  async function (page: number) {
    const response = await fetch(
      `https://blog.kata.academy/api/articles?limit=20&offset=${page}`,
    );
    if (!response.ok) {
      throw new Error("Server Error!");
    }
    const data = await response.json();

    return data.articles;
  },
);

export const fetchRegisrationUser = createAsyncThunk<
  any,
  IFormInputs,
  { rejectValue: string }
>(
  "articles/fetchRegisrationUser",
  async ({ userName, email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch("https://blog.kata.academy/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: { username: userName, email, password },
        }),
      });

      const data = await response.json();

      return data;
    } catch (err) {
      // You can choose to use the message attached to err or write a custom error
      return rejectWithValue("Opps there seems to be an error");
    }
  },
);
export const fetchLoginUser = createAsyncThunk<
  any,
  IFormInputs,
  { rejectValue: string }
>(
  "articles/fetchLoginUser",
  async ({ email, password }, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        "https://blog.kata.academy/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({
            user: { email, password },
          }),
        },
      );

      const data = await response.json();
      localStorage.setItem("username", data.user.username);

      return data;
    } catch (err) {
      return rejectWithValue("Opps there seems to be an error");
    }
  },
);
export const fetchEditUser = createAsyncThunk<
  any,
  IFormInputs,
  { rejectValue: string }
>(
  "articles/fetchEditUser",
  async ({ userName, email, password, img }, { rejectWithValue }) => {
    console.log(userName, email, password, img);

    const token = localStorage.getItem("token");
    try {
      const response = await fetch("https://blog.kata.academy/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          user: { username: userName, email, password, bio: "", image: img },
        }),
      });

      const data = await response.json();
      console.log(data);

      localStorage.setItem("username", data.user.username);
      localStorage.setItem("image", data.user.image);
      return data;
    } catch (err) {
      return rejectWithValue("Opps there seems to be an error");
    }
  },
);

export const fetchCreatArticle = createAsyncThunk<
  any,
  IFormArtickeInputs,
  { rejectValue: string }
>(
  "articles/fetchCreatArticle",
  async ({ title, description, body, a }, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("https://blog.kata.academy/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          article: { title, description, body, tagList: a },
        }),
      });

      const data = await response.json();

      return data;
    } catch (err) {
      return rejectWithValue("Opps there seems to be an error");
    }
  },
);
export const fetchEditArticle = createAsyncThunk<
  any,
  IFormArtickeInputs,
  { rejectValue: string }
>(
  "articles/fetchEditArticle",
  async ({ title, description, body, slug }, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `https://blog.kata.academy/api/articles/${slug}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({
            article: { title, description, body },
          }),
        },
      );

      const data = await response.json();

      return data;
    } catch (err) {
      return rejectWithValue("Opps there seems to be an error");
    }
  },
);
export const fetchDeliteArticle = createAsyncThunk(
  "articles/fetchDeliteArticle",
  async function (slug: string | number) {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `https://blog.kata.academy/api/articles/${slug}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      },
    );
    if (!response.ok) {
      throw new Error("Server Error!");
    }
    const data = await response.json();

    return data;
  },
);

export const fetchArtclesSlug = createAsyncThunk(
  "articles/fetchArtclesSkug",
  async function (slug: string | number) {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `https://blog.kata.academy/api/articles/${slug}`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    );
    if (!response.ok) {
      throw new Error("Server Error!");
    }
    const data = await response.json();

    return data.article;
  },
);

export const fetchLike = createAsyncThunk(
  "articles/fetchCreatArticle",
  async function (slug: string | number) {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `https://blog.kata.academy/api/articles/${slug}/favorite`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      },
    );

    const data = await response.json();
    return data;
  },
);

export const fetchDeleteLike = createAsyncThunk(
  "articles/fetchDeleteLike",
  async function (slug: string | number) {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `https://blog.kata.academy/api/articles/${slug}/favorite`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      },
    );

    const data = await response.json();

    return data;
  },
);
