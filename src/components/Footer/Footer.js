import React from 'react';
import { Route, Switch } from 'react-router-dom';

const Footer = () => {

  return (
    <Switch>
      <Route exact path="/">
        <footer className="footer">
          <p className="footer__text">
            Учебный проект Яндекс.Практикум х BeatFilm.
          </p>
          <div className="footer__down">
            <p className="footer__copyright">
              {" "}
              &copy; {new Date().getFullYear()}
            </p>
            <ul className="footer__links">
              <li className="footer__item">
                <a href="https://praktikum.yandex.ru" className="footer__link">
                  Яндекс.Практикум
                </a>
              </li>
              <li className="footer__item">
                <a href="https://github.com" className="footer__link">
                  Github
                </a>
              </li>
              <li className="footer__item">
                <a
                  href="https://www.facebook.com/yandex.praktikum/"
                  className="footer__link"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </Route>
      <Route path="/signup">
        <footer></footer>
      </Route>
      <Route path="/signin">
        <footer></footer>
      </Route>
      <Route path="/profile">
        <footer></footer>
      </Route>

      <Route path="/movies">
        <footer className="footer">
          <p className="footer__text">
            Учебный проект Яндекс.Практикум х BeatFilm.
          </p>
          <div className="footer__down">
            <p className="footer__copyright">
              {" "}
              &copy; {new Date().getFullYear()}
            </p>
            <ul className="footer__links">
              <li className="footer__item">
                <a href="https://praktikum.yandex.ru" className="footer__link">
                  Яндекс.Практикум
                </a>
              </li>
              <li className="footer__item">
                <a href="https://github.com" className="footer__link">
                  Github
                </a>
              </li>
              <li className="footer__item">
                <a
                  href="https://www.facebook.com/yandex.praktikum/"
                  className="footer__link"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </Route>
      <Route path="/saved-movies">
        <footer className="footer">
          <p className="footer__text">
            Учебный проект Яндекс.Практикум х BeatFilm.
          </p>
          <div className="footer__down">
            <p className="footer__copyright">
              {" "}
              &copy; {new Date().getFullYear()}
            </p>
            <ul className="footer__links">
              <li className="footer__item">
                <a href="https://praktikum.yandex.ru" className="footer__link">
                  Яндекс.Практикум
                </a>
              </li>
              <li className="footer__item">
                <a href="https://github.com" className="footer__link">
                  Github
                </a>
              </li>
              <li className="footer__item">
                <a
                  href="https://www.facebook.com/yandex.praktikum/"
                  className="footer__link"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </Route>
      <Route path={['/*', '*']}>
        <footer></footer>
      </Route>
    </Switch>
  );
}
export default Footer;