import React from "react";
import { Pagination } from "antd";
import ArticlesCards from "../ArticlesCards/ArticlesCards";
import { useAppSelector, useAppDispatch } from "../hook/hook";
import { BlogCardsProps } from "../interfaces/BlogCardsProps";
import { fetchPagination } from "../../store/getArticlesReducer";
import AviasalesCardAuthor from "../ArticlesCards/AviasalesCardAuthor";

function ArticlesList() {
  const articl = useAppSelector((state) => state.blog.articles);
  const dispatch = useAppDispatch();
  return (
    <ul>
      {articl.map((articles: BlogCardsProps) => {
        return (
          <li className="articles_card" key={Math.random() * 500}>
            <ArticlesCards articles={articles} />
            <AviasalesCardAuthor articles={articles} />
          </li>
        );
      })}
      <Pagination
        onChange={(num) => dispatch(fetchPagination(num))}
        className="ant-pagination blog-pagination"
        size="small"
        total={50}
      />
    </ul>
  );
}

export default ArticlesList;
