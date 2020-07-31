import React, { useState, useEffect } from "react";
import axios from "axios";

const Repo = ({ repo }) => {
  const [forkedRepo, setForkedRepo] = useState({});

  useEffect(() => {
    const fetchFormRepo = async () => {
      const response = await axios(repo.url);
      const data = response.data;
      setForkedRepo(data);
    };
    if (repo.fork) {
      fetchFormRepo();
    }
  }, [repo.fork, repo.url]);

  return (
    <div>
      <li>
        <h3>
          <a href={repo.html_url}>{repo.name}</a>
        </h3>
        {repo.fork && forkedRepo && forkedRepo.id && (
          <h4>
            forked from{" "}
            <a href={forkedRepo.parent.html_url}>
              {forkedRepo.parent.full_name}
            </a>
          </h4>
        )}
        <h4>{repo.description}</h4>
        <ul>
          <li>Created on: {repo.created_at}</li>
          <li>Last Update on: {repo.updated_at} </li>
          {repo.license && <li>License: {repo.license.spdx_id} </li>}
          {repo.stargazers_count > 0 && <li>Stars: {repo.stargazers_count}</li>}
          {repo.forks > 0 && <li> Forks: {repo.forks}</li>}
          {repo.watchers > 0 && <li> Watchers: {repo.watchers}</li>}
          {repo.open_issues > 0 && <li>Open Issues: {repo.open_issues}</li>}
        </ul>
      </li>
    </div>
  );
};

export default Repo;
