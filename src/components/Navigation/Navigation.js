import React, { useState } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';

const Navigation = () => {
  const  [mobileMenuState, setmobileMenuState]  = useState(false);

  const openMobileMenu = () => {
    mobileMenuState 
      ? setmobileMenuState(false)
      : setmobileMenuState(true)
  }

  let menuClassName = mobileMenuState ? `menu_active` : '';
    
  return (
    <Switch>
      <Route exact path="/">
        <nav className="menu">
          <NavLink to="/signup" className="menu__btn">Регистрация</NavLink>
          <NavLink to="/signin" className="menu__btn menu__btn_green">Войти</NavLink>
        </nav>
      </Route>
      <Route path="/movies">
        <button type="button" className="menu__burger-btn" onClick={openMobileMenu}>
          <span className="menu__burger-btn-line"></span>
        </button>
        <div className={`menu ${menuClassName}`}>
        <button type="button" className="menu__burger-btn" onClick={openMobileMenu} />
          <button className="menu__close-btn" onClick={openMobileMenu}/>
          <NavLink exact to="/" className="menu__link menu__link_main" activeClassName="menu__link_active">Главная</NavLink>
          <NavLink to="/movies" className="menu__link" activeClassName="menu__link_active">Фильмы</NavLink>
          <NavLink to="/saved-movies" className="menu__link" activeClassName="menu__link_active">Сохранённые фильмы</NavLink>
          <NavLink to="/profile" className="menu__account">Аккаунт</NavLink>
        </div>
      </Route>
    </Switch>
    
  )
}
export default Navigation;