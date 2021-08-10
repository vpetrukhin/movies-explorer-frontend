import React from 'react';

import Logo from '../Logo/Logo';

const Header = () => {
  
  return (
    <header className="header">
      <Logo />
      <div className="header__menu">
        <button className="header__btn">Регистрация</button>
        <button className="header__btn header__btn_green">Войти</button>
      </div>
    </header>
  )
}
export default Header;