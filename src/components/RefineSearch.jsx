import React from "react";

const RepoRefine = (props) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Repository Name"
        name="reponame"
        value={props.repoFilter.string}
        onChange={props.handleRefineChange}
      />
    </div>
  );
};

export default RepoRefine;
