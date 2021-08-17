import React from 'react';

const Profile = ({ user }) => {
  
  return (
    <section className="profile">
      <h1 className="profile__title">Привет, {user}!</h1>
      <form className="profile__form">
        <div className="profile__input-wrapper">
          <label className="profile__label" htmlFor="userName">Имя</label>
          <input className="profile__input" id="userName" type="text" value="Виталий" />
        </div>
        <div className="profile__input-wrapper">
          <label className="profile__label" htmlFor="userEmail">E-mail</label>
          <input className="profile__input" id="userEmail" type="email" value="pochta@yandex.ru" />
        </div>
        <button className="profile__btn">Редактировать</button>
      </form>
      <button className="profile__btn profile__btn_signout">Выйти из аккаунта</button>
    </section>
  )
}

export default Profile;