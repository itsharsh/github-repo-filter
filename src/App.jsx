import React, { useState } from "react";
import axios from "axios";

import UserSearch from "./components/UserSearch";
import RepoRefine from "./components/RefineSearch";
import Repos from "./components/Repos";

const githubAPI = "https://api.github.com/users/";

function App() {
  const [repos, setRepos] = useState([]);
  const [username, setUsername] = useState("itsharsh");
  const [isLoading, setIsLoading] = useState(false);
  const [repoFilter, setRepoFilter] = useState({ string: "" });

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

  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    fetchRepo(username);
  };

  const handleRefineChange = (e) => {
    e.preventDefault();
    setRepoFilter({ ...repoFilter, string: e.target.value });
  };

  return (
    <div>
      <UserSearch
        handleUsernameSubmit={handleUsernameSubmit}
        username={username}
        setUsername={setUsername}
      />
      {isLoading ? <div>Loading ...</div> : <div></div>}
      {/* @TODO loading spinner when searching for user */}
      {repos.length > 0 && (
        <RepoRefine
          repos={repos}
          repoFilter={repoFilter}
          handleRefineChange={handleRefineChange}
        />
      )}

      <Repos repos={repos} repoFilter={repoFilter} />
    </div>
  );
}

export default App;
