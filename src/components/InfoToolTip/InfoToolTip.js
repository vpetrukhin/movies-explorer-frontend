import React from 'react';

const InfoToolTip = ({ isActive }) => {
  
  return (
    <>
      {isActive && (
        <div className="modal">
          <p className="modal__text">
            Во время запроса произошла ошибка. Возможно, проблема с соединением
            или сервер недоступен. Подождите немного и попробуйте ещё раз.
          </p>
        </div>
      )}
    </>
  );
}
export default InfoToolTip;