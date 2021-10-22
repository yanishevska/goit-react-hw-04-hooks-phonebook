import React from "react";
import s from "./Filter.module.css";

const Filter = ({ value, onChange }) => (
  <label className={s.filterLabel}>
    Find contacts by name
    <input
      className={s.formInput}
      type="text"
      value={value}
      onChange={onChange}
    />
  </label>
);

export default Filter;
