import { createSlice } from "@reduxjs/toolkit";
import { BlogCardsProps } from "../components/interfaces/BlogCardsProps";
import {
  fetchArticles,
  fetchPagination,
  fetchArtclesSlug,
  fetchRegisrationUser,
  fetchLoginUser,
  fetchEditUser,
  fetchEditArticle,
} from "./ApiReducer";

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
  modal: boolean;
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
  modal: false,
};

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
    setModal(state, action) {
      state.modal = action.payload;
      // console.log(action.payload);
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
      .addCase(fetchArtclesSlug.fulfilled, (state, action) => {
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

export const { oauth, setEdit, setModal } = blogSlice.actions;

export default blogSlice.reducer;
