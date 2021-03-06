import React from 'react';

const NavTab = () => {
  
  return (
    <nav className="nav">
      <ul className="nav__list">
        <li className="nav__item">
          <a href="#aboutProject" className="nav__link">О проекте</a>
        </li>
        <li className="nav__item">
          <a href="#techs" className="nav__link">Технологии</a>
        </li>
        <li className="nav__item">
          <a href="#aboutMe" className="nav__link">Студент</a>
        </li>
      </ul>
    </nav>
  )
}
export default NavTab;