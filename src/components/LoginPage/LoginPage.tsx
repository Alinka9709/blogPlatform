/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import { useForm } from "react-hook-form";

import "./LoginPage.scss";
import { Link } from "react-router-dom";

interface IFormInputs {
  email: number | string;
  password: number | string;
}

export default function AuthorizationRegisteredUser() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<IFormInputs>({
    mode: "onBlur",
  });
  const onSubmit = (data: IFormInputs) => {
    alert(JSON.stringify(data));
    reset();
  };
  return (
    <div className="wrapper-registration-user">
      <form
        className="registration-user__container"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className="registration-user__header">Sign In</h3>
        <label className="registration-user__label">Email address</label>
        <input
          className="registration-user"
          type="email"
          {...register("email", {
            required: "Email must be a valid email address",
            minLength: {
              value: 6,
              message: "Email needs to be at least 6 characters",
            },
          })}
          placeholder="Email address"
        />
        <div> {errors?.email && <p>{errors?.email?.message || "Eror"}</p>}</div>
        <label className="registration-user__label">Password </label>
        <input
          className="registration-user"
          type="password"
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
          {errors?.password && <p>{errors?.password?.message || "Error"}</p>}
        </div>
        <input
          className=" registration-user__button"
          disabled={!isValid}
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
