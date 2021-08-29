import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <section className="page-not-found">
      <div className="page-not-found__container">
        <h1 className="page-not-found__title">404</h1>
        <p className="page-not-found__subtitle">Страница не найдена</p>
        <Link className="page-not-found__link" to="/">
          Назад
        </Link>
      </div>
    </section>
  );
};
export default PageNotFound;
