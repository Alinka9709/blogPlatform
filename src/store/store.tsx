import { configureStore } from "@reduxjs/toolkit";

import getArticlesReducer from "./getArticlesReducer";

export const store = configureStore({
  reducer: {
    blog: getArticlesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
