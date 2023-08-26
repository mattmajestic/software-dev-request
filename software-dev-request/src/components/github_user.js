import React, { useState, useEffect } from 'react';

const GitHubUser = ({ accessToken }) => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://api.github.com/user', {
      headers: {
        Authorization: `token ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setUserData(data))
      .catch((error) => setError('Error fetching GitHub user data'));
  }, [accessToken]);

  return (
    <div>
      {userData ? (
        <div>
          <h2>GitHub Coder Information</h2>
          <p>Name: {userData.name}</p>
          // <p>Login: {userData.login}</p>
          // <p>Avatar URL: <img src={userData.avatar_url} alt="Avatar" /></p>
        </div>
      ) : (
        <p>{error || 'Loading GitHub user data...'}</p>
      )}
    </div>
  );
};

export default GitHubUser;
