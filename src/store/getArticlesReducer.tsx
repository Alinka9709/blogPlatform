import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BlogCardsProps } from "../components/interfaces/BlogCardsProps";
import {
  IFormInputs,
  IFormArtickeInputs,
} from "../components/interfaces/IFormInputs";

interface Blog {
  articles: BlogCardsProps[];
  loading: boolean;
  error: string | null;
  // post: BlogCardsProps | Record<string, any>;
  post: any;
  status: boolean;
  username: string;
  img: string;
  title: string;
  description: string;
  body: string;
  isEdit: boolean;
}
const initialState: Blog = {
  articles: [],
  post: [],
  loading: false,
  error: null,
  status: false,
  username: "",
  img: "",
  title: "",
  description: "",
  body: "",
  isEdit: false,
};
export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async function () {
    const response = await fetch("https://blog.kata.academy/api/articles");
    if (!response.ok) {
      throw new Error("Server Error!");
    }
    const data = await response.json();

    return data.articles;
  },
);
// eslint-disable-next-line import/prefer-default-export
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
export const fetchArtclesSkug = createAsyncThunk(
  "articles/fetchArtclesSkug",
  async function (skug: string | number) {
    const response = await fetch(
      `https://blog.kata.academy/api/articles/${skug}`,
    );
    if (!response.ok) {
      throw new Error("Server Error!");
    }
    const data = await response.json();

    return data.article;
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
      // You can choose to use the message attached to err or write a custom error

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
  async ({ title, description, body, tag }, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("https://blog.kata.academy/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          article: { title, description, body, tagList: tag },
        }),
      });

      const data = await response.json();
      console.log(data);

      return data;
    } catch (err) {
      // You can choose to use the message attached to err or write a custom error

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
    console.log(title, description, body);

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
      console.log(data);

      return data;
    } catch (err) {
      return rejectWithValue("Opps there seems to be an error");
    }
  },
);

export const blogSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    oauth(state, action) {
      state.status = action.payload;
    },
    setEdit(state, action) {
      state.isEdit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.articles = action.payload;
        state.loading = false;
      })
      .addCase(fetchPagination.fulfilled, (state, action) => {
        state.articles = action.payload;
      })
      .addCase(fetchArtclesSkug.fulfilled, (state, action) => {
        state.post = action.payload;
      })
      .addCase(fetchRegisrationUser.fulfilled, (state, action) => {
        state.status = true;

        localStorage.setItem("token", action.payload.user.token);
      })
      .addCase(fetchLoginUser.fulfilled, (state, action) => {
        state.status = true;
        localStorage.setItem("token", action.payload.user.token);
      })
      .addCase(fetchEditUser.fulfilled, (state, action) => {
        state.username = action.payload.user.username;
        state.img = action.payload.user.image;
      })
      .addCase(fetchEditArticle.fulfilled, (state, action) => {
        state.title = action.payload.article.title;
        state.description = action.payload.article.description;
        state.body = action.payload.article.body;
      });
  },
});

export const { oauth, setEdit } = blogSlice.actions;

export default blogSlice.reducer;
