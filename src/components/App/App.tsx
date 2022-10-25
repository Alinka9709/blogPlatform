import React from "react";
import { Switch, Route } from "react-router-dom";

import CreateNewPost from "../CreateNewPost/CreateNewPost";
import ArticlesList from "../ArticlesList/ArticlesList";

import ArticlesPost from "../ArticlesPost/ArticlesPost";
import "./App.scss";
import RegisterPage from "../RegisterPage/RegisterPage";
import LoginPage from "../LoginPage/LoginPage";
import Header from "../BlogHeader/Header";
import EditPage from "../EditPage/EditPage";

function App() {
  return (
    <section className="blog">
      <Header />
      <section className="blog__wrapper">
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
