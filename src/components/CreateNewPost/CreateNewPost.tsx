/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import "./CreateNewPost.scss";
import { useParams } from "react-router-dom";
import { IFormArtickeInputs } from "../interfaces/IFormInputs";
import { useAppDispatch, useAppSelector } from "../hook/hook";
import {
  fetchCreatArticle,
  fetchEditArticle,
} from "../../store/getArticlesReducer";

function CreateNewPost() {
  const dispatch = useAppDispatch();
  const isEdit = useAppSelector((state) => state.blog.isEdit);
  console.log(isEdit);

  const { slug } = useParams();
  console.log(slug);

  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm<IFormArtickeInputs>({
    mode: "all",
  });

  const onSubmit: SubmitHandler<IFormArtickeInputs> = ({
    title,
    description,
    tag,
    body,
  }) => {
    if (isEdit) {
      dispatch(fetchEditArticle({ title, description, body, slug }));
      console.log(fetchEditArticle({ title, description, body, slug }));
    } else {
      dispatch(fetchCreatArticle({ title, description, body, tag }));
    }

    reset();
  };
  return (
    <div className="wrapper-new-post">
      <form className="new-post__container" onSubmit={handleSubmit(onSubmit)}>
        <h3 className="new-post__header">Create new article</h3>
        <label className="new-post__label">Title </label>
        <input
          className="new-post__title"
          {...register("title", {
            required: true,
          })}
          placeholder="Title"
        />
        <div>
          {errors?.title && (
            <p className="new-post__error-message">
              {errors?.title?.message || "Eror"}
            </p>
          )}
        </div>

        <label className="new-post__label">Short description </label>
        <input
          className="new-post__title"
          {...register("description", {
            required: true,
          })}
          placeholder="Title"
        />
        <div>
          {" "}
          {errors?.description && (
            <p className="new-post__error-message">
              {errors?.description?.message || "Error"}
            </p>
          )}
        </div>

        <label className="new-post__label">Text </label>
        <input
          type="text"
          className="new-post__body"
          {...register("body", {
            required: true,
          })}
          placeholder="Text"
        />

        <div>
          {" "}
          {errors?.body && (
            <p className="new-post__error-message">
              {errors?.body?.message || "Error"}
            </p>
          )}
        </div>
        <label className="new-post__label">Tags</label>
        <div className="new-post__container__tags">
          <div className="new-post__container__button">
            <input
              type="text"
              className="new-post"
              {...register("tag", {
                required: true,
              })}
              placeholder="Tag"
            />

            <button type="button" className="new-post__btn">
              Delete
            </button>

            <button type="button" className="new-post__btn">
              Add tag
            </button>
          </div>
          <div>
            {" "}
            {errors?.tag && (
              <p className="new-post__error-message">
                {errors?.tag?.message || "Error"}
              </p>
            )}
          </div>

          <input className="new-post__button" type="submit" value="Send" />
        </div>
      </form>
    </div>
  );
}

export default CreateNewPost;
