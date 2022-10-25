import React, { useState } from "react";
import "./ModalWindow.scss";
import { useParams, Redirect } from "react-router-dom";
import img from "../../image/exclamation-circle.png";
import { setModal } from "../../store/getArticlesReducer";
import { useAppDispatch } from "../hook/hook";

import { fetchDeliteArticle, fetchArticles } from "../../store/ApiReducer";

function ModalWindow() {
  const dispatch = useAppDispatch();
  const [delet, setDelet] = useState(false);

  const { slug } = useParams();
  const delitePost = () => {
    dispatch(fetchDeliteArticle(slug))
      .then((user) => {
        if (user) {
          setDelet(true);
        }
      })
      .then(() => dispatch(fetchArticles()))

      .then(() => dispatch(setModal(false)));
  };
  if (delet) {
    return <Redirect to="/" />;
  }
  return (
    <div className="modalwindow__wrapper">
      <div className="modalwindow">
        <p className="modalwindow__text">
          <span className="modalwindow__img-container">
            <img className="modalwindow__img" src={img} alt="" />{" "}
          </span>
          Are you sure to delete this article?
        </p>
        <div className="modalwindow__container__button">
          <button
            type="button"
            className="modalwindow__btn"
            onClick={() => dispatch(setModal(false))}
          >
            No
          </button>

          <button
            type="button"
            className="modalwindow__btn"
            onClick={delitePost}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalWindow;
