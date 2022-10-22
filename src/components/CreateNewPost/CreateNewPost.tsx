/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import "./CreateNewPost.scss";
import { useParams, Redirect } from "react-router-dom";

import { IFormArtickeInputs } from "../interfaces/IFormInputs";
import { useAppDispatch, useAppSelector } from "../hook/hook";
import { fetchCreatArticle, fetchEditArticle } from "../../store/ApiReducer";

function CreateNewPost() {
  const [edit, setEdit] = useState(false);
  const [create, setСreate] = useState(false);
  const dispatch = useAppDispatch();
  const { isEdit, post } = useAppSelector((state) => state.blog);

  const { slug } = useParams();

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
      dispatch(fetchEditArticle({ title, description, body, slug })).then(
        (user) => {
          if (user) {
            setСreate(true);
          }
        },
      );
    } else {
      dispatch(fetchCreatArticle({ title, description, body, tag })).then(
        (user) => {
          if (user) {
            setEdit(true);
          }
        },
      );
    }

    reset();
  };
  if (edit) {
    return <Redirect to="/" />;
  }
  if (create) {
    return <Redirect to="/" />;
  }
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
          defaultValue={isEdit ? post.title : ""}
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
          defaultValue={isEdit ? post.description : ""}
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
          defaultValue={isEdit ? post.body : ""}
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
              defaultValue={isEdit ? post.text : ""}
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
