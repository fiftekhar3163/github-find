import axios from "axios";
import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

function ResultPage() {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const PUBLIC_KEY = process.env.REACT_APP_GITHUB_PAT;
  const options = useMemo(
    () => ({ headers: { Authorization: `Bearer ${PUBLIC_KEY}` } }),
    [PUBLIC_KEY]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https:/api.github.com/users/${username}`,
          options
        );
        setUserData(response.data);
        const reposResponse = await axios.get(
          `https:/api.github.com/users/${username}/repos`,
          options
        );
        setRepos(reposResponse.data);
        setLoading(false);
      } catch (error) {
        setIsError(true);
        setLoading(false);
      }
    };

    fetchData();
  }, [username, options]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <h1>No User found</h1>;
  }

  return (
    <>
      <motion.main>
        <section className="result-box flex flex-column center">
          <div className="flex flex-column center gap-10">
            <img src={userData.avatar_url} alt="avatar" />
            <h1>{userData.name}</h1>
            <div className="flex gap-10">
              <div className="flex flex-column center gap-10">
                <span>{repos.length}</span>
                <span className="uppercase">Repositories</span>
              </div>
              <div className="flex flex-column center gap-10">
                <span>{userData.followers}</span>
                <span className="uppercase">Followers</span>
              </div>
              <div className="flex flex-column center gap-10">
                <span>{userData.following}</span>
                <span className="uppercase">Following</span>
              </div>
            </div>
            <div className="link center">
              <a
                href={userData.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="link">Visit Profile</div>
              </a>
            </div>
          </div>
          {console.log(repos)}
          <div className="repos-list">
            <h2>Repositories:</h2>
            {repos &&
              repos
                .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
                .map((repo) => (
                  <div key={repo.id} className="repo-container">
                    <div className="flex justify-between">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="repo-name"
                      >
                        {repo.name}
                      </a>
                      <span className="repo-date">
                        Updated at {formatDate(repo.updated_at)}
                      </span>
                    </div>
                    <p>{repo.description}</p>
                  </div>
                ))}
          </div>
        </section>
      </motion.main>
    </>
  );
}

export default ResultPage;
