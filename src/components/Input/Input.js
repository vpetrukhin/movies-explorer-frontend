import React from 'react';

const Input = ({ inputId, inputType, labelText }) => {
  
  return (
    <div className="input__wrapper">
      <label className="input__label" htmlFor={inputId}>{labelText}</label>
      <input className="input__item" type={inputType} id="name"/>
      <span className="input__error-text">Что-то пошло не так...</span>
    </div>
  )
}
export default Input;