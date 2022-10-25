/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import "./EditPage.scss";
import { IFormInputs } from "../interfaces/IFormInputs";
import { fetchEditUser } from "../../store/ApiReducer";
import { useAppDispatch } from "../hook/hook";

function EditPage() {
  const [login, setLogin] = useState(false);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInputs>({
    mode: "onBlur",
  });
  const onSubmit = (data: IFormInputs) => {
    dispatch(fetchEditUser(data)).then((user) => {
      if (user) {
        setLogin(true);
      }
    });
    reset();
  };
  if (login) {
    return <Redirect to="/" />;
  }
  return (
    <div className="wrapper-form">
      <form className="form-edit__container" onSubmit={handleSubmit(onSubmit)}>
        <h3 className="form-edit__header">Edit Profile</h3>
        <label className="form-edit__label">Username </label>
        <input
          className="form-edit"
          {...register("userName", {
            required: "The field is required",
            minLength: {
              value: 3,
              message: " Username needs to be at least 3 characters",
            },
            maxLength: {
              value: 20,
              message: "Username must be no more than 20 characters ",
            },
          })}
          placeholder="Username"
        />
        <div>
          {errors?.userName && (
            <p className="form-edit__error-message">
              {errors?.userName?.message || "Eror"}
            </p>
          )}
        </div>

        <label className="form-edit__label">Email address </label>
        <input
          type="email"
          className="form-edit"
          {...register("email", {
            required: "example@example.com",
          })}
          placeholder="Email address"
        />
        <div>
          {" "}
          {errors?.email && (
            <p className="form-edit__error-message">
              {errors?.email?.message || "Eror"}
            </p>
          )}
        </div>

        <label className="form-edit__label"> New Password </label>
        <input
          type="password"
          className="form-edit"
          {...register("password", {
            required: false,
          })}
          placeholder="Password"
        />

        <div>
          {" "}
          {errors?.password && (
            <p className="form-edit__error-message">
              {errors?.password?.message || "Error"}
            </p>
          )}
        </div>

        <label className="form-edit__label">Avatar image (url)</label>
        <input
          type="img"
          className="form-edit"
          {...register("img", {
            required: false,
          })}
          placeholder="Avatar image"
        />

        <div>
          {" "}
          {errors?.img && (
            <p className="form-edit__error-message">
              {errors?.img?.message || "https://www.example.com/image.png"}
            </p>
          )}
        </div>
        <input className=" form-edit__button" type="submit" value="Save" />
      </form>
    </div>
  );
}

export default EditPage;
