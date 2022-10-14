import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BlogCardsProps } from "../components/interfaces/BlogCardsProps";

interface Blog {
  articles: BlogCardsProps[];
  loading: boolean;
  error: string | null;
  post: BlogCardsProps | Record<string, any>;
}
const initialState: Blog = {
  articles: [],
  post: {},
  loading: false,
  error: null,
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
  async function (skug: string) {
    const response = await fetch(
      `https://blog.kata.academy/api/articles/${skug}`,
    );
    if (!response.ok) {
      throw new Error("Server Error!");
    }
    const data = await response.json();
    console.log(data);

    return data.articles;
  },
);

export const blogSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {},
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
      });
  },
});

// export const {  } = blogSlice.actions;

export default blogSlice.reducer;
