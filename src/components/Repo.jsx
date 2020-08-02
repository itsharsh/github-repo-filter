import React, { useState, useEffect } from "react";
import axios from "axios";
import Moment from "react-moment";

const Repo = ({ repo, updateLanguages }) => {
  const [forkedRepo, setForkedRepo] = useState({});
  const [languages, setLanguages] = useState({});

  useEffect(() => {
    const fetchForkRepo = async () => {
      const response = await axios(repo.url, {
        headers: {
          accept: "application/vnd.github.v3+json",
        },
      });
      const data = response.data;
      setForkedRepo(data);
    };

    const fetchLanguages = async () => {
      const response = await axios(repo.languages_url, {
        headers: {
          accept: "application/vnd.github.v3+json",
        },
      });
      const data = response.data;
      setLanguages(data);
      let repoLang = [];
      Object.entries(data).map(([lang]) => repoLang.push(lang));
      // updateLanguages(repoLang);
    };
    if (repo.fork) {
      fetchForkRepo();
    }
    fetchLanguages();
  }, [repo]);

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
      <p>
        Created on: <Moment format="MMM Do, YYYY">{repo.created_at}</Moment>
      </p>
      <p>
        Last Updated <Moment fromNow>{repo.updated_at}</Moment>
      </p>
    </div>
  );
};

export default Repo;
