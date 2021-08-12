import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../Logo/Logo';
import Input from '../Input/Input';

const Login = () => {
  
  return (
    <section className="login">
      <Logo logoClassName="login__logo" />
      <h1 className="login__title">Рады видеть!</h1>
      <form className="login__form">
        <Input inputId="email" inputType="email" labelText="E-mail" />
        <Input inputId="password" inputType="password" labelText="Пароль" />
        <button className="login__btn" type="submit">Войти</button>
        <p className="login__subtext">
          Ещё не зарегистрированы?
          <Link to="/signup" className="login__link">Регистрация</Link>
        </p>
      </form>
    </section>
  )
}
export default Login;