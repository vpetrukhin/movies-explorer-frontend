import React from 'react';

import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

const SearchForm = () => {
  
  return (
    <form className="search-form">
      <input className="search-form__input"  placeholder="Фильм" />
      <button className="search-form__btn" type="submit" />
      <FilterCheckbox />
    </form>
  )
}
export default SearchForm;