import React, { useState } from "react";
import axios from "axios";

import Home from "./components/UserSearch";

const githubAPI = "https://api.github.com/users/";

function App() {
  const [repos, setRepos] = useState([]);
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchRepo(username);
  };

  return (
    <div>
      <Home
        handleSubmit={handleSubmit}
        username={username}
        setUsername={setUsername}
      />
      {isLoading ? <div>Loading ...</div> : <div></div>}
      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>{repo.name}</li>
        ))}
      </ul>
      {/* @TODO loading spinner when searching for user */}
    </div>
  );
}

export default App;
