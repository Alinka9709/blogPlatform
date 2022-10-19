/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Redirect } from "react-router-dom";
import { fetchLoginUser } from "../../store/getArticlesReducer";

import { IFormInputs } from "../interfaces/IFormInputs";
import { useAppDispatch } from "../hook/hook";
import "./LoginPage.scss";

// interface IFormInputRegister {
//   email: number | string;
//   password: number | string;
// }

export default function AuthorizationRegisteredUser() {
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
    dispatch(fetchLoginUser(data)).then((user) => {
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
    <div className="wrapper-registration-user">
      <form
        className="registration-user__container"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className="registration-user__header">Sign In</h3>
        <label className="registration-user__label">Email address</label>
        <input
          type="email"
          className="form-registration"
          {...register("email", {
            required: "example@example.com",
          })}
          placeholder="Email address"
        />
        <div>
          {" "}
          {errors?.email && (
            <p className="form-registration__error-message">
              {errors?.email?.message || "Eror"}
            </p>
          )}
        </div>
        <label className="registration-user__label">Password </label>
        <input
          className="registration-user"
          // type="password"
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
          // placeholder="Password"
        />
        <div>
          {" "}
          {errors?.password && (
            <p className="registration-user__error-message">
              {errors?.password?.message || "Error"}
            </p>
          )}
        </div>
        <input
          className=" registration-user__button"
          // disabled={!isValid}
          type="submit"
          value="Login"
        />
        <div className=" registration-user__text-account">
          Don’t have an account?{" "}
          <Link to="/sign-up">
            <span className="registration-user__span">Sign Up.</span>
          </Link>
        </div>
      </form>
    </div>
  );
}
