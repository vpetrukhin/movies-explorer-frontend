import React, { useState } from 'react';

import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

const SearchForm = ({ handleSearchFormSubmit }) => {

  const [searchFormData, setSearchFormData] = useState({
    input: '',
    isShortFilm: false,
    validateError: false,
  });

  const submitHandler = (e) => {
    e.preventDefault();

    if (!searchFormData.input) setSearchFormData({ ...searchFormData, validateError: true });

    handleSearchFormSubmit(searchFormData.input, searchFormData.isShortFilm);

    searchFormData.input = '';
  }
  const inputHandler = (e) => setSearchFormData({ ...searchFormData, input: e.target.value });
  const checkboxHandler = (isShortFilm) => {
    setSearchFormData({ ...searchFormData, isShortFilm });
  }

  return (
    <form className="search-form" onSubmit={submitHandler} noValidate>
      <div className="search-form__inner">
        <input
          className="search-form__input"
          placeholder="Фильм"
          value={searchFormData.input}
          required
          onChange={inputHandler}
        />
        {searchFormData.validateError && (
          <span className="search-form__error">
            Нужно ввести ключевое слово
          </span>
        )}
        <button className="search-form__btn" type="submit" />
      </div>
      <div className="search-form__checkbox-wrapper">
        <FilterCheckbox checkboxValueHandler={checkboxHandler} />
      </div>
    </form>
  );
};
export default SearchForm;