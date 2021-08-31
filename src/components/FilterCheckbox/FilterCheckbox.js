import React from 'react';

const FilterCheckbox = ({ checkboxValueHandler }) => {

  const checkboxHandler = (e) => {
    checkboxValueHandler(e.target.checked);
  };

  return (
    <div className="filter-checkbox">
      <input
        className="filter-checkbox__input"
        type="checkbox"
        id="filterCheckbox"
        onChange={checkboxHandler}
      />
      <label className="filter-checkbox__label" htmlFor="filterCheckbox">
        Короткометражки
      </label>
    </div>
  );
};
export default FilterCheckbox;