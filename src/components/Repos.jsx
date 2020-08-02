import React from "react";

import Repo from "./Repo";

const Repos = (props) => (
  <div>
    <ul>
      {props.repos.map((repo) => {
        const FilterStringMatch = repo.name
          .toLowerCase()
          .includes(props.repoFilter.toLowerCase())
          ? true
          : false;
        return (
          FilterStringMatch && (
            <Repo
              key={repo.id}
              repo={repo}
              updateLanguages={props.updateLanguages}
            />
          )
        );
      })}
    </ul>
  </div>
);

export default Repos;
