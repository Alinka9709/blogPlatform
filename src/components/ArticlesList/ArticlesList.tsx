import React from "react";
import { Pagination, Spin } from "antd";
import ArticlesCards from "../ArticlesCards/ArticlesCards";
import { useAppSelector, useAppDispatch } from "../hook/hook";
import { BlogCardsProps } from "../interfaces/BlogCardsProps";
import { fetchPagination } from "../../store/ApiReducer";
import AviasalesCardAuthor from "../ArticlesCards/AviasalesCardAuthor";

function ArticlesList() {
  const { loading, error } = useAppSelector((state) => state.blog);
  const articl = useAppSelector((state) => state.blog.articles);
  const dispatch = useAppDispatch();
  return (
    <ul>
      {loading && <Spin className="blog__loading" tip="Loading..." />}
      {error && <h2>An error occured: {error}</h2>}
      {articl.map((articles: BlogCardsProps) => {
        return (
          <li className="articles_card" key={Math.random() * 500}>
            <ArticlesCards articles={articles} />
            <AviasalesCardAuthor articles={articles} />
          </li>
        );
      })}
      {!loading && (
        <Pagination
          onChange={(num) => dispatch(fetchPagination(num))}
          className="ant-pagination blog-pagination"
          defaultCurrent={1}
          total={500}
        />
      )}
    </ul>
  );
}

export default ArticlesList;
