import React from "react";
import { Link } from "react-router-dom";
import { useFormWithValidation } from "../../hooks/useForm";

import Logo from "../Logo/Logo";

const Login = ({ submitHandler }) => {
  const {
    values,
    errors,
    isValid,
    handleChange,
    resetForm,
  } = useFormWithValidation();
  const errClassName = !isValid
    ? "input__error-text input__error-text_active"
    : "input__error-text";

  const handleSubmit = e => {
    e.preventDefault();
    submitHandler(values);
    resetForm();
  }

  return (
    <section className="login">
      <Logo logoClassName="login__logo" />
      <h1 className="login__title">Рады видеть!</h1>
      <form className="login__form" onSubmit={handleSubmit} noValidate>
        <div className="input__wrapper">
          <label className="input__label" htmlFor="email">
            E-mail
          </label>
          <input
            className="input__item"
            type="email"
            id="email"
            name="email"
            value={values.email || ""}
            onChange={handleChange}
            required
          />
          <span className={errClassName}>{errors.email || ""}</span>
        </div>
        <div className="input__wrapper">
          <label className="input__label" htmlFor="paasword">
            Пароль
          </label>
          <input
            className="input__item"
            type="password"
            id="password"
            name="password"
            value={values.password || ""}
            onChange={handleChange}
            minLength='8'
            required
          />
          <span className={errClassName}>{errors.password || ""}</span>
        </div>
        <button className="login__btn" type="submit">
          Войти
        </button>
        <p className="login__subtext">
          Ещё не зарегистрированы?
          <Link to="/signup" className="login__link">
            Регистрация
          </Link>
        </p>
      </form>
    </section>
  );
};
export default Login;
