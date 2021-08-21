import React from 'react';

const FilterCheckbox = () => {
  
  return (
    <div className="filter-checkbox">
      <input className="filter-checkbox__input" type="checkbox" id="filterCheckbox"/>
      <label className="filter-checkbox__label" htmlFor="filterCheckbox" >Короткометражки</label>
    </div>
  )
}
export default FilterCheckbox;