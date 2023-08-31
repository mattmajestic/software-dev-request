import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://rjmgkgtoruefbqqohelw.supabase.co', process.env.REACT_APP_SUPABASE);

export default function GitHubAuth() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const session = supabase.auth.session();
    setSession(session?.user);
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        switch (event) {
          case "SIGNED_IN":
            setSession(session?.user);
            break;
          case "SIGNED_OUT":
            setSession(null);
            break;
          default:
        }
      }
    );
    return () => {
      authListener.unsubscribe();
    };
  }, []);

  const login = async () => {
    await supabase.auth.signIn({
      provider: "github",
    });
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div>
      {session ? (
        <div>
          <h1>Authenticated</h1>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button onClick={login}>Login with Github</button>
      )}
    </div>
  );
}
