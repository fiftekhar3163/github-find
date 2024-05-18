import React, { useState, useMemo } from "react";
import { FaGithub } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SearchPage() {
  const [username, setUsername] = useState("");
  const [userFound, setUserFound] = useState(true);

  const navigate = useNavigate();
  const PUBLIC_KEY = process.env.REACT_APP_GITHUB_PAT;
  const options = useMemo(
    () => ({ headers: { Authorization: `Bearer ${PUBLIC_KEY}` } }),
    [PUBLIC_KEY]
  );

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const trimedUsername = username.trim();
    try {
      const response = await axios.get(
        `https:/api.github.com/users/${trimedUsername}`,
        options
      );
      if (response.status === 200) {
        setUserFound(true);
        navigate(`/result/${trimedUsername}`);
      }
    } catch (error) {
      setUserFound(false);
    }
  };

  return (
    <>
      <section className="search-point flex center">
        <div className="logo">
          <FaGithub />
        </div>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value.replace(/\s/g, "_"))}
            placeholder="Username"
          />
          <button type="submit">Search</button>
        </form>
        <p className="error">{!userFound && "User not found"}</p>
      </section>
    </>
  );
}

export default SearchPage;
