import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BlogCardsProps } from "../components/interfaces/BlogCardsProps";
import { IFormInputs } from "../components/interfaces/IFormInputs";

interface Blog {
  articles: BlogCardsProps[];
  loading: boolean;
  error: string | null;
  // post: BlogCardsProps | Record<string, any>;
  post: any;
  status: boolean;
  token: boolean;
  username: string;

  img: string;
}
const initialState: Blog = {
  articles: [],
  post: [],
  loading: false,
  error: null,
  status: false,
  token: false,

  username: "",
  img: "",
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
const clearLocalStatus = () => {
  const removeStatus = () => localStorage.removeItem("status");
  removeStatus();
};
export const blogSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    oauth(state) {
      clearLocalStatus();
      state.status = false;
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
      .addCase(fetchLoginUser.fulfilled, (state) => {
        state.token = true;
        state.status = true;
      })
      .addCase(fetchEditUser.fulfilled, (state, action) => {
        state.username = action.payload.user.username;
        state.img = action.payload.user.image;
      });
  },
});

export const { oauth } = blogSlice.actions;

export default blogSlice.reducer;
