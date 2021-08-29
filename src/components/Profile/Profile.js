import React, { useContext } from 'react';
import { currentUserContext } from '../../contexts/userContext';
import { useFormWithValidation } from '../../hooks/useForm';

const Profile = ({ profileUpdate, signOutHandler }) => {
  const currentUser = useContext(currentUserContext);
  const { values, handleChange, resetForm, isValid, errors } = useFormWithValidation();

  const errClassName = !isValid
    ? "input__error-text input__error-text_active"
    : "input__error-text";


  const handleSubmit = (e) => {
    e.preventDefault();
    profileUpdate(values);
    resetForm();
  };


  return (
    <section className="profile">
      <h1 className="profile__title">Привет, {currentUser.name}!</h1>
      <form className="profile__form" onSubmit={handleSubmit} noValidate>
        <div className="profile__input-wrapper">
          <label className="profile__label" htmlFor="userName">
            Имя
          </label>
          <input
            className="profile__input"
            id="userName"
            type="text"
            name="name"
            placeholder={currentUser.name}
            value={values.name || ""}
            onChange={handleChange}
            minLength="2"
            maxLength="30"
            required
          />
          <span className={errClassName}>{errors.name || ""}</span>
        </div>
        <div className="profile__input-wrapper">
          <label className="profile__label" htmlFor="userEmail">
            E-mail
          </label>
          <input
            className="profile__input"
            id="userEmail"
            type="email"
            name="email"
            placeholder={currentUser.email}
            value={values.email || ""}
            onChange={handleChange}
            required
          />
          <span className={errClassName}>{errors.email || ""}</span>
        </div>
        <button type="submit" className="profile__btn">
          Редактировать
        </button>
      </form>
      <button
        className="profile__btn profile__btn_signout"
        onClick={signOutHandler}
      >
        Выйти из аккаунта
      </button>
    </section>
  );
};

export default Profile;