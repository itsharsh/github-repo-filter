import React, { useState } from "react";
import axios from "axios";

import UserSearch from "./components/UserSearch";
import Filters from "./components/Filters";
import Repos from "./components/Repos";

const githubAPI = "https://api.github.com/users/";

function App() {
  const [repos, setRepos] = useState([]);
  const [allLanguages, setAllLanguages] = useState([]);
  const [username, setUsername] = useState("itsharsh");
  const [isLoading, setIsLoading] = useState(false);
  const [repoNameFilter, setRepoNameFilter] = useState("");
  const [langFilter, setLangFilter] = useState("");

  const fetchRepo = async (username) => {
    setIsLoading(true);
    try {
      const response = await axios(`${githubAPI}${username}/repos`);
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
    if (!allLanguages.includes(lang)) {
      setAllLanguages((allLanguages) => [...allLanguages, lang]);
      console.log(allLanguages.includes(lang));
      console.log("adding: ", lang);
      console.log(" in: ", allLanguages);
    }
  };

  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    fetchRepo(username);
  };

  const handleFilterChange = (e) => {
    e.preventDefault();
    console.log(e.target.name);
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

          {isLoading ? <div>Loading ...</div> : <div></div>}
          {/* @TODO loading spinner when searching for user */}
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
      />
    </div>
  );
}

export default App;
