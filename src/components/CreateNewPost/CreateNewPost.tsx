/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import "./CreateNewPost.scss";
import { useParams, Redirect } from "react-router-dom";

import { IFormArtickeInputs } from "../interfaces/IFormInputs";
import { useAppDispatch, useAppSelector } from "../hook/hook";
import {
  fetchCreatArticle,
  fetchEditArticle,
  fetchArticles,
} from "../../store/ApiReducer";

function CreateNewPost() {
  const [edit, setEdit] = useState(false);
  const [create, setСreate] = useState(false);
  const dispatch = useAppDispatch();
  const { isEdit, post } = useAppSelector((state) => state.blog);
  const token = localStorage.getItem("token");
  const { slug } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<IFormArtickeInputs>({
    defaultValues: {
      tag:
        // post.tagList &&
        post.tagList.map((item: any) => ({
          value: `${item}`,
        })),
    },
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<IFormArtickeInputs> = (data) => {
    const { title, description, body, tag } = data;
    const a = tag?.map((item) => item.value);

    if (isEdit) {
      dispatch(fetchEditArticle({ title, description, body, slug, a, token }))
        .then((user) => {
          if (user) {
            setСreate(true);
          }
        })
        .then(() => dispatch(fetchArticles()));
    } else {
      dispatch(fetchCreatArticle({ title, description, body, a, token }))
        .then((user) => {
          if (user) {
            setEdit(true);
          }
        })
        .then(() => {
          dispatch(fetchArticles());
        });
    }

    reset();
  };
  const { fields, append, remove } = useFieldArray({
    control,
    name: "tag",
  });

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
        <textarea
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
            <button
              type="button"
              className="new-post__btn"
              onClick={() =>
                append({
                  value: "",
                })
              }
            >
              Add tag
            </button>
          </div>
          {fields.map((field, index) => {
            return (
              <div className="new-post__container__button" key={field.id}>
                <input
                  type="text"
                  className="new-post"
                  id="tag"
                  {...register(`tag.${index}.value` as const)}
                  placeholder="Tag"
                  defaultValue={`tag.${index}`}
                />

                <button
                  type="button"
                  className="new-post__btn-del"
                  onClick={() => remove(index)}
                >
                  Delete
                </button>
              </div>
            );
          })}

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
