import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

function Auth0test() {
  const { user, loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const [userInfo, setUserInfo] = useState({});

  // useEffect();
  console.log(user);
  return (
    <>
      {isAuthenticated ? (
        <div>
          <div>{JSON.stringify(user)}</div>
          <button onClick={() => logout()}>Logout</button>
        </div>
      ) : (
        <button onClick={() => loginWithRedirect()}>Login with Google</button>
      )}
    </>
  );
}

export default Auth0test;
