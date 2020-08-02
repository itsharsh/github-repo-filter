import React from "react";

const Filters = (props) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search Repository"
        name="repoNameFilter"
        value={props.repoNameFilter}
        onChange={props.handleFilterChange}
      />
      {/* <select
        name="langFilter"
        value={props.langFilter}
        onChange={props.handleFilterChange}
      >
        {props.allLanguages.map((lang, i) => (
          <option key={i} value={lang}>
            {lang}
          </option>
        ))}
      </select> */}
    </div>
  );
};

export default Filters;
