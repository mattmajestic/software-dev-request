import React from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://rjmgkgtoruefbqqohelw.supabase.co', process.env.REACT_APP_SUPABASE);

const GitHubAuth = () => {
  const handleGitHubLogin = async () => {
    const { error } = await supabase.auth.signIn({ provider: 'github' });

    if (error) {
      console.error('GitHub authentication error:', error);
    }
  };

  return (
    <button onClick={handleGitHubLogin}>Login with GitHub</button>
  );
};

export default GitHubAuth;
