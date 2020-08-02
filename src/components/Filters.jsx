import React from "react";

const Filters = (props) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Repository Name"
        name="repoNameFilter"
        value={props.repoNameFilter}
        onChange={props.handleFilterChange}
      />
      <select
        name="langFilter"
        value={props.langFilter}
        onChange={props.handleFilterChange}
      >
        {/* {props.allLanguages.map((lang) => (
          <option value={lang} key={lang}>
            {lang}
          </option>
        ))} */}
      </select>
    </div>
  );
};

export default Filters;
