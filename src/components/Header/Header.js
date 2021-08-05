import React from 'react';

import logo from '../../images/logo.svg';

const Header = () => {
  
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="logo"/>
      <div className="header__menu">
        <button className="header__btn">Регистрация</button>
        <button className="header__btn header__btn_green">Войти</button>
      </div>
    </header>
  )
}
export default Header;