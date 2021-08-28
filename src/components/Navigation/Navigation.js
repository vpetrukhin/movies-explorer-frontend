import React, { useState } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';

const Navigation = () => {
  const  [mobileMenuState, setmobileMenuState]  = useState(false);

  let menuClassName;

  const openMobileMenu = () => {
    setmobileMenuState(true);

  }

  const closeMobileMenu = () => {
    setmobileMenuState(false);
  }

  menuClassName = mobileMenuState ? `menu_active` : '';

  return (
    <Switch>
      <Route exact path="/">
        <nav className="btns">
          <NavLink to="/signup" className="btns__btn">Регистрация</NavLink>
          <NavLink to="/signin" className="btns__btn btns__btn_green">Войти</NavLink>
        </nav>
      </Route>
      <Route path="/movies">
        <button type="button" className="menu__burger-btn" onClick={openMobileMenu}>
          <span className="menu__burger-btn-line"></span>
        </button>
        <div className={`menu ${menuClassName}`}>
          <button type="button" className="menu__burger-btn" onClick={openMobileMenu} />
          <button className="menu__close-btn" onClick={closeMobileMenu}/>
          <NavLink exact to="/" className="menu__link menu__link_main" activeClassName="menu__link_active" onClick={closeMobileMenu}>Главная</NavLink>
          <NavLink to="/movies" className="menu__link" activeClassName="menu__link_active" onClick={closeMobileMenu}>Фильмы</NavLink>
          <NavLink to="/saved-movies" className="menu__link" activeClassName="menu__link_active" onClick={closeMobileMenu}>Сохранённые фильмы</NavLink>
          <NavLink to="/profile" className="menu__account" onClick={closeMobileMenu}>Аккаунт</NavLink>
        </div>
      </Route>
      <Route path="/saved-movies">
        <button type="button" className="menu__burger-btn" onClick={openMobileMenu}>
          <span className="menu__burger-btn-line"></span>
        </button>
        <div className={`menu ${menuClassName}`}>
        <button type="button" className="menu__burger-btn" onClick={openMobileMenu} />
          <button className="menu__close-btn" onClick={closeMobileMenu}/>
          <NavLink exact to="/" className="menu__link menu__link_main" activeClassName="menu__link_active" onClick={closeMobileMenu}>Главная</NavLink>
          <NavLink to="/movies" className="menu__link" activeClassName="menu__link_active" onClick={closeMobileMenu}>Фильмы</NavLink>
          <NavLink to="/saved-movies" className="menu__link" activeClassName="menu__link_active" onClick={closeMobileMenu}>Сохранённые фильмы</NavLink>
          <NavLink to="/profile" className="menu__account" onClick={closeMobileMenu}>Аккаунт</NavLink>
        </div>
      </Route>
      <Route path="/profile">
        <button type="button" className="menu__burger-btn" onClick={openMobileMenu}>
          <span className="menu__burger-btn-line"></span>
        </button>
        <div className={`menu ${menuClassName}`}>
        <button type="button" className="menu__burger-btn" onClick={openMobileMenu} />
          <button className="menu__close-btn" onClick={openMobileMenu}/>
          <NavLink exact to="/" className="menu__link menu__link_main" activeClassName="menu__link_active" onClick={closeMobileMenu}>Главная</NavLink>
          <NavLink to="/movies" className="menu__link" activeClassName="menu__link_active" onClick={closeMobileMenu}>Фильмы</NavLink>
          <NavLink to="/saved-movies" className="menu__link" activeClassName="menu__link_active" onClick={closeMobileMenu}>Сохранённые фильмы</NavLink>
          <NavLink to="/profile" className="menu__account" onClick={closeMobileMenu}>Аккаунт</NavLink>
        </div>
      </Route>
    </Switch>

  )
}
export default Navigation;