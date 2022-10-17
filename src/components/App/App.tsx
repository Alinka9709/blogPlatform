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

function App() {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.blog);
  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  return (
    <section className="blog">
      {/* <Router> */}
      <BlogHeader />
      <section className="blog__wrapper">
        {loading && <h2>Loading...</h2>}
        {error && <h2>An error occured: {error}</h2>}
        <Switch>
          <Route exact path="/" component={ArticlesList} />
          <Route path="/slug" component={ArticlesPost} />
          <Route exact path="/sign-in" component={LoginPage} />
          <Route exact path="/sign-up" component={RegisterPage} />
        </Switch>
      </section>
      {/* </Router> */}
    </section>
  );
}

export default App;
