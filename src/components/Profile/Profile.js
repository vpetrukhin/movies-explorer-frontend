import React, { useContext, useState } from 'react';
import { currentUserContext } from '../../contexts/userContext';
import { useFormWithValidation } from '../../hooks/useForm';

const Profile = ({ profileUpdate, signOutHandler, fetchError }) => {
  const currentUser = useContext(currentUserContext);
  const {
    values,
    handleChange,
    resetForm,
    isValid,
    errors,
  } = useFormWithValidation();

  const errClassName = !isValid
    ? "profile__input-error-text profile__input-error-text_active"
    : "profile__input-error-text";

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
        {fetchError.isSuccess && (
          <p className="profile__message">Информация обновленна!</p>
        )}
        {fetchError.isError && (
          <p className="profile__message profile__message_error">
            Ошибка! Попробуйте снова.
          </p>
        )}
        <button
          type="submit"
          className={`profile__btn ${!isValid && "profile__btn_disabled"}`}
          disabled={!isValid}
        >
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