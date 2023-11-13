import React, { useState, useEffect, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import NycvisuApi from "../api/api";
import UserContext from "./UserContext";
function Auth0test() {
  const { user, loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const { currUser, setCurrUser } = useContext(UserContext);

  async function authenticateWithAuth0(sub) {
    const allUsers = await NycvisuApi.getAllUsers();
    const subs = allUsers.map((u) => u.username);

    console.log("authenticating....", subs, sub);
    if (subs.includes(sub)) {
      console.log("includes!");
      const fetchedUser = await NycvisuApi.getAuth0User(sub);
      console.log(fetchedUser);
      setCurrUser(fetchedUser);
    } else {
      console.log("not includes!");
      const fetchedUser = await NycvisuApi.createAuth0User({
        username: user.sub,
        firstName: user.given_name,
        lastName: user.family_name,
        email: user.email,
      });
      console.log(fetchedUser);
    }
  }
  useEffect(
    function getUser() {
      async function fetchUser() {
        if (user) {
          authenticateWithAuth0(user.sub);
        }
      }
      fetchUser();
    },
    [user]
  );
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
