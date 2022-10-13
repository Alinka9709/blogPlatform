import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { BlogCardsProps } from "../components/interfaces/BlogCardsProps";

interface Blog {
  articles: BlogCardsProps[];
  loading: boolean;
  error: string | null;
  pageCount: number;
}
const initialState: Blog = {
  articles: [],
  loading: false,
  error: null,
  pageCount: 1,
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
// export const fetchPagination = createAsyncThunk(
//   "articles/fetchArticles",
//   async function (dispatch: any) {
//     const response = await fetch("https://blog.kata.academy/api/articles");
//     if (!response.ok) {
//       throw new Error("Server Error!");
//     }
//     const data = await response.json();

//     dispatch(setPageCount(data.articles));
//   },
// );

export const blogSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setPageCount(state, action: PayloadAction<number>) {
      state.pageCount = action.payload;

      console.log(1);
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
      });
  },
});

export const { setPageCount } = blogSlice.actions;

export default blogSlice.reducer;
