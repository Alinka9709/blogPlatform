import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Pagination } from "antd";
import ArticlesList from "../ArticlesList/ArticlesList";
import { useAppDispatch, useAppSelector } from "../hook/hook";
import { fetchArticles, fetchPagination } from "../../store/getArticlesReducer";
import ArticlesPost from "../ArticlesPost/ArticlesPost";

import BlogHeader from "../BlogHeader/BlogHeader";
import "./App.scss";

function App() {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.blog);
  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  return (
    <section className="blog">
      <Router>
        <BlogHeader />
        <section className="blog__wrapper">
          {loading && <h2>Loading...</h2>}
          {error && <h2>An error occured: {error}</h2>}
          <Switch>
            <Route path="/" component={ArticlesList} />
          </Switch>
          <Switch>
            <Route path="/articles" component={ArticlesList} />
          </Switch>
          <Switch>
            <Route path="/articles/:slug" component={ArticlesPost} />
          </Switch>

          <Pagination
            onChange={(num) => dispatch(fetchPagination(num))}
            className="ant-pagination blog-pagination"
            size="small"
            total={50}
          />
        </section>
      </Router>
    </section>
  );
}

export default App;
