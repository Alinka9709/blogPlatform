/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../hook/hook";
import { fetchRegisrationUser } from "../../store/getArticlesReducer";
import { IFormInputs } from "../interfaces/IFormInputs";

import "./RegisterPage.scss";

function RegisterPage() {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<IFormInputs>({
    mode: "onBlur",
  });
  const onSubmit = (data: IFormInputs) => {
    // alert(JSON.stringify(data));
    console.log(data);
    dispatch(fetchRegisrationUser(data));
    reset();
  };
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
            required: true,
          })}
          placeholder="Password"
        />
        <div>
          {errors?.password && (
            <p className="form-registration__error-message">
              Please,repeat your password!
            </p>
          )}
        </div>
        <div className="form-registration__checkbox">
          <input type="checkbox" id="scales" name="scales" checked />
          <label htmlFor="a" className="form-registration__label-text">
            {" "}
            I agree to the processing of my personal information
          </label>
        </div>

        <input
          className=" form-registration__button"
          disabled={!isValid}
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
