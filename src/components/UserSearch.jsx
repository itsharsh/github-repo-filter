import React from "react";

const Home = (props) => {
  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <input
          type="text"
          name="username"
          value={props.username}
          placeholder="Username to search for?"
          onChange={(e) => {
            props.setUsername(e.target.value);
          }}
        />{" "}
        <input type="submit" />
      </form>
    </div>
  );
};

export default Home;
