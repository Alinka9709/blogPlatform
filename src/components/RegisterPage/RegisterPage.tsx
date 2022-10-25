/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Redirect } from "react-router-dom";
import { useAppDispatch } from "../hook/hook";
import { fetchRegisrationUser } from "../../store/ApiReducer";
import { IFormInputs } from "../interfaces/IFormInputs";

import "./RegisterPage.scss";

function RegisterPage() {
  const [login, setLogin] = useState(false);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<IFormInputs>({
    mode: "all",
  });
  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = (data: IFormInputs) => {
    dispatch(fetchRegisrationUser(data)).then((user) => {
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
      <form
        className="form-registration__container"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className="form-registration__header">Create new account</h3>
        <label className="form-registration__label">Username </label>
        <input
          className="form-registration"
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
            <p className="form-registration__error-message">
              {errors?.userName?.message || "Eror"}
            </p>
          )}
        </div>

        <label className="form-registration__label">Email address </label>
        <input
          type="email"
          className="form-registration"
          {...register("email", {
            required: "Email is required",
            pattern: /^[a-za-z0-9]+@(?:[a-za-z0-9]+\.)+[a-za-z]+$/,
          })}
          placeholder="Email address"
        />
        <div>
          {" "}
          {errors?.email && (
            <p className="form-registration__error-message">
              {errors?.email?.message || "Please enter a valid email"}
            </p>
          )}
        </div>

        <label className="form-registration__label">Password </label>
        <input
          type="password"
          className="form-registration"
          {...register("password", {
            required: "The field is required",
            minLength: {
              value: 6,
              message: "Password needs to be at least 6 characters",
            },
            maxLength: {
              value: 40,
              message: "Password must be no more than 40 characters ",
            },
          })}
          placeholder="Password"
        />

        <div>
          {" "}
          {errors?.password && (
            <p className="form-registration__error-message">
              {errors?.password?.message || "Error"}
            </p>
          )}
        </div>

        <label className="form-registration__label">Repeat Password</label>
        <input
          type="password"
          className="form-registration"
          {...register("confirmpasword", {
            required: "The field is required",
            validate: (value) =>
              value === password.current || "The passwords do not match",
          })}
          placeholder="Password"
        />

        <div>
          {" "}
          {errors?.confirmpasword && (
            <p className="form-registration__error-message">
              {errors?.confirmpasword?.message ||
                "OOPPS...Passwords do not match"}
            </p>
          )}
        </div>
        <div className="form-registration__checkbox">
          <input type="checkbox" id="scales" name="scales" />
          <label htmlFor="a" className="form-registration__label-text">
            {" "}
            I agree to the processing of my personal information
          </label>
        </div>

        <input
          className=" form-registration__button"
          type="submit"
          value="Create"
        />
        <div className=" form-registration__text-account">
          Already have an account?{" "}
          <Link to="/sign-in">
            <span className="form-registration__span">Sign In.</span>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;
