import React, { useState } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import UserSearch from "./components/UserSearch";
import Filters from "./components/Filters";
import Repos from "./components/Repos";

const githubAPI = "https://api.github.com/users/";

function App() {
  const [repos, setRepos] = useState([]);
  const [allLanguages, setAllLanguages] = useState([]);
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [repoNameFilter, setRepoNameFilter] = useState("");
  const [langFilter, setLangFilter] = useState("");

  const fetchRepo = async (username) => {
    setIsLoading(true);
    try {
      const response = await axios(`${githubAPI}${username}/repos`, {
        headers: {
          accept: "application/vnd.github.v3+json",
        },
      });
      if (response.data.length === 0) {
        alert("User Not Found!!");
      } else {
        setRepos(response.data);
      }
    } catch (error) {
      alert(error.message);
    }
    setIsLoading(false);
  };

  const updateLanguages = (lang) => {
    setAllLanguages((prevAllLanguages) => {
      return [...prevAllLanguages, lang];
    });
  };

  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    fetchRepo(username);
  };

  const handleFilterChange = (e) => {
    e.preventDefault();
    switch (e.target.name) {
      case "repoNameFilter":
        setRepoNameFilter(e.target.value);
        break;
      case "langFilter":
        setLangFilter(e.target.value);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <header>
        <nav>
          <UserSearch
            handleUsernameSubmit={handleUsernameSubmit}
            username={username}
            setUsername={setUsername}
          />

          {isLoading && (
            <Loader
              type="Bars"
              color="#00BFFF"
              height={30}
              width={30}
              timeout={3000} //3 secs
            />
          )}
          {repos.length > 0 && (
            <Filters
              repos={repos}
              allLanguages={allLanguages}
              repoNameFilter={repoNameFilter}
              langFilter={langFilter}
              handleFilterChange={handleFilterChange}
            />
          )}
        </nav>
      </header>

      <Repos
        repos={repos}
        repoFilter={repoNameFilter}
        updateLanguages={updateLanguages}
        allLanguages={allLanguages}
      />
    </div>
  );
}

export default App;
