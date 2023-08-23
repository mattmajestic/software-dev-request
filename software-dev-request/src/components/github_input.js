import React, { useState } from 'react';

const GitHubInput = ({ onUrlSubmit }) => {
  const [repoUrl, setRepoUrl] = useState('');

  const handleUrlChange = (e) => {
    setRepoUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUrlSubmit(repoUrl);
  };

  return (
    <div>
      <h2>Enter GitHub Repository URL:</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={repoUrl}
          onChange={handleUrlChange}
          placeholder="https://github.com/owner/repo"
        />
        <button type="submit">Fetch User Data</button>
      </form>
    </div>
  );
};

export default GitHubInput;
