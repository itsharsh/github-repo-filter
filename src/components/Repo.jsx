import React, { useState, useEffect } from "react";
import axios from "axios";

const Repo = ({ repo, updateLanguages }) => {
  const [forkedRepo, setForkedRepo] = useState({});
  const [languages, setLanguages] = useState({});

  useEffect(() => {
    const fetchFormRepo = async () => {
      const response = await axios(repo.url);
      const data = response.data;
      setForkedRepo(data);
    };
    const fetchLanguages = async () => {
      const response = await axios(repo.languages_url);
      const data = response.data;
      setLanguages(data);
      console.log(repo.name);
      Object.entries(data).map(([lang]) => updateLanguages(lang));
    };
    if (repo.fork) {
      fetchFormRepo();
    }
    fetchLanguages();
  }, [repo.name, repo.fork, repo.url, repo.languages_url, updateLanguages]);

  return (
    <div className="repoContainer">
      <h3>
        <a href={repo.html_url}>{repo.name}</a>
      </h3>
      {repo.fork && forkedRepo && forkedRepo.id && (
        <h4>
          forked from{" "}
          <a href={forkedRepo.parent.html_url}>{forkedRepo.parent.full_name}</a>
        </h4>
      )}
      <h4>{repo.description}</h4>
      {Object.keys(languages).length > 0 && (
        <ul>
          {Object.entries(languages).map(([language], i) => (
            <li key={i}>{language}</li>
          ))}
        </ul>
      )}
      <ul>
        {repo.license && <li>License: {repo.license.spdx_id} </li>}
        {repo.stargazers_count > 0 && <li>Stars: {repo.stargazers_count}</li>}
        {repo.forks > 0 && <li> Forks: {repo.forks}</li>}
        {repo.watchers > 0 && <li> Watchers: {repo.watchers}</li>}
        {repo.open_issues > 0 && <li>Open Issues: {repo.open_issues}</li>}
      </ul>
      <p>Created on: {repo.created_at} </p>
      <p>Last Update on: {repo.updated_at}</p>
    </div>
  );
};

export default Repo;
