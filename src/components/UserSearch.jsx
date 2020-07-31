import React from "react";

const Home = (props) => {
  return (
    <div>
      <form onSubmit={props.handleUsernameSubmit}>
        <input
          type="text"
          name="username"
          value={props.username}
          placeholder="Username"
          onChange={(e) => {
            props.setUsername(e.target.value);
          }}
        />{" "}
        <button type="submit">Search User</button>
      </form>
    </div>
  );
};

export default Home;
