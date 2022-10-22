import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import CreateNewPost from "../CreateNewPost/CreateNewPost";
import ArticlesList from "../ArticlesList/ArticlesList";
import { useAppDispatch, useAppSelector } from "../hook/hook";
import { fetchArticles, oauth } from "../../store/getArticlesReducer";
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
  const token = localStorage.getItem("token");
  useEffect(() => {
    dispatch(fetchArticles());
    if (token) {
      dispatch(oauth(true));
    }
  }, [dispatch, token]);

  return (
    <section className="blog">
      {status ? <BlogHeaderAuthorised /> : <BlogHeader />}
      <section className="blog__wrapper">
        {loading && <h2>Loading...</h2>}
        {error && <h2>An error occured: {error}</h2>}
        <Switch>
          <Route exact path="/" component={ArticlesList} />
          <Route exact path="/articles" component={ArticlesList} />
          <Route path="/articles/:slug" component={ArticlesPost} />
          <Route exact path="/sign-in" component={LoginPage} />
          <Route exact path="/sign-up" component={RegisterPage} />
          <Route exact path="/profile" component={EditPage} />
          <Route exact path="/new-article" component={CreateNewPost} />
          <Route
            exact
            path="/new-article/:slug/edit"
            component={CreateNewPost}
          />
        </Switch>
      </section>
    </section>
  );
}

export default App;
