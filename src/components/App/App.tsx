import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import ArticlesList from "../ArticlesList/ArticlesList";
import { useAppDispatch, useAppSelector } from "../hook/hook";
import { fetchArticles } from "../../store/getArticlesReducer";
import ArticlesPost from "../ArticlesPost/ArticlesPost";

import BlogHeader from "../BlogHeader/BlogHeader";
import "./App.scss";
import RegisterPage from "../RegisterPage/RegisterPage";
import LoginPage from "../LoginPage/LoginPage";
import BlogHeaderAuthorised from "../BlogHeader/BlogHeaderAuthorised";
import EditPage from "../EditPage/EditPage";

function App() {
  const dispatch = useAppDispatch();
  const { loading, error, status } = useAppSelector((state) => state.blog);

  if (status) {
    localStorage.setItem("token", JSON.stringify(status));
  }
  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  return (
    <section className="blog">
      {localStorage.getItem("token") ? (
        <BlogHeaderAuthorised />
      ) : (
        <BlogHeader />
      )}
      <section className="blog__wrapper">
        {loading && <h2>Loading...</h2>}
        {error && <h2>An error occured: {error}</h2>}
        <Switch>
          <Route exact path="/" component={ArticlesList} />
          <Route path="/slug" component={ArticlesPost} />
          <Route exact path="/sign-in" component={LoginPage} />
          <Route exact path="/sign-up" component={RegisterPage} />
          <Route exact path="/profile" component={EditPage} />
        </Switch>
      </section>
    </section>
  );
}

export default App;
