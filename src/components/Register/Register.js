import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../Logo/Logo';

const Register = () => {
  
  return (
    <section className="register">
      <Logo logoClassName="register__logo" />
      <h1 className="register__title">Добро пожаловать!</h1>
      <form className="register__form">
        <div className="register__input-wrapper">
          <label className="register__input-label" htmlFor="name">Имя</label>
          <input className="register__input" type="text" id="name"/>
          <span className="register__error-text">Что-то пошло не так...</span>
        </div>
        <div className="register__input-wrapper">
          <label className="register__input-label" htmlFor="email">E-mail</label>
          <input className="register__input" type="email" id="email"/>
          <span className="register__error-text">Что-то пошло не так...</span>
        </div>
        <div className="register__input-wrapper">
          <label className="register__input-label" htmlFor="password">Пароль</label>
          <input className="register__input" type="password" id="password"/>
          <span className="register__error-text">Что-то пошло не так...</span>
        </div>
        <button className="register__btn" type="submit">Зарегистрироваться</button>
        <p className="register__subtext">
          Уже зарегистрированы?
          <Link to="/signin" className="register__link">Войти</Link>
        </p>
      </form>
    </section>
  )
}
export default Register;