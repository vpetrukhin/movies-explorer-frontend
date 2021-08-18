import React from 'react';

import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

const SearchForm = () => {
  
  return (
    <form className="search-form">
      <div className="search-form__inner">
        <input className="search-form__input"  placeholder="Фильм" required/>
        <button className="search-form__btn" type="submit" />
      </div>
      <div className="search-form__checkbox-wrapper"><FilterCheckbox /></div>
    </form>
  )
}
export default SearchForm;