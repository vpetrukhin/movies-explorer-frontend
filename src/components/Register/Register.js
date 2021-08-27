import React from "react";
import { Link } from "react-router-dom";

import Logo from "../Logo/Logo";
import { useFormWithValidation } from "../../hooks/useForm";

const Register = ({ registerHandler }) => {
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

  // useEffect(() => {
  //   resetForm();
  // }, [])


  const handleSubmit = (e) => {
    e.preventDefault();
    registerHandler(values);
    resetForm();
  };

  return (
    <section className="register">
      <Logo logoClassName="register__logo" />
      <h1 className="register__title">Добро пожаловать!</h1>
      <form
        className="register__form"
        onSubmit={handleSubmit}
        noValidate
        name="register"
      >
        <div className="input__wrapper">
          <label className="input__label" htmlFor="name">
            Имя
          </label>
          <input
            className="input__item"
            type="text"
            id="name"
            name="name"
            value={values.name || ""}
            onChange={handleChange}
            minLength="2"
            maxLength="30"
            required
          />
          <span className={errClassName}>{errors.name}</span>
        </div>
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
            minLength="8"
            required
          />
          <span className={errClassName}>{errors.password || ""}</span>
        </div>
        <button className="register__btn" type="submit">
          Зарегистрироваться
        </button>
        <p className="register__subtext">
          Уже зарегистрированы?
          <Link to="/signin" className="register__link">
            Войти
          </Link>
        </p>
      </form>
    </section>
  );
};
export default Register;
