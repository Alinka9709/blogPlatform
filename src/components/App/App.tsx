import { useEffect } from "react";
import { Pagination } from "antd";
import ArticlesList from "../ArticlesList/ArticlesList";
import { useAppDispatch, useAppSelector } from "../hook/hook";
import { fetchArticles, setPageCount } from "../../store/getArticlesReducer";
// import { fetchPagination } from "../../store/ApiReducer";
import BlogHeader from "../BlogHeader/BlogHeader";
import "./App.scss";

function App() {
  const dispatch = useAppDispatch();
  const { loading, error, pageCount } = useAppSelector((state) => state.blog);
  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  return (
    <section className="blog">
      <BlogHeader />
      <section className="blog__wrapper">
        {loading && <h2>Loading...</h2>}
        {error && <h2>An error occured: {error}</h2>}
        <ArticlesList />
        <Pagination
          onChange={() => dispatch(setPageCount(pageCount + 1))}
          className="ant-pagination blog-pagination"
          size="small"
          total={50}
        />
      </section>
    </section>
  );
}

export default App;
