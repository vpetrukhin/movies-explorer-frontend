import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../Logo/Logo';
import Input from '../Input/Input';

const Register = () => {
  
  return (
    <section className="register">
      <Logo logoClassName="register__logo" />
      <h1 className="register__title">Добро пожаловать!</h1>
      <form className="register__form">
        <Input inputId="name" inputType="text" labelText="Имя"/>
        <Input inputId="email" inputType="email" labelText="E-mail" />
        <Input inputId="password" inputType="password" labelText="Пароль" />
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