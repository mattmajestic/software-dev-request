import React from 'react';

const GitHubInput = ({ setGitUrl, setDescription }) => {
  return (
    <div className="input-container">
      <label className="input-label">GitHub URL:</label>
      <input
        type="text"
        className="git-input" // Apply styles to this class
        placeholder="Enter GitHub URL"
        onChange={(e) => setGitUrl(e.target.value)}
      />
      <label className="input-label">Description:</label>
      <textarea
        className="description-input" // Apply styles to this class
        placeholder="Enter description"
        onChange={(e) => setDescription(e.target.value)}
      />
    </div>
  );
};

export default GitHubInput;
