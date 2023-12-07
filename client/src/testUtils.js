import React from "react";
import UserContext from "./auth/UserContext";

const demoUser = {
  username: "testuser",
  first_name: "testfirst",
  last_name: "testlast",
  email: "test@test.net",
  is_admin: true,
  auth_type: "custom",
  maps: [],
};

const demoCurrUserMaps = [];

const UserProvider = ({
  children,
  currUser = demoUser,
  currUserMaps = demoCurrUserMaps,
}) => (
  <UserContext.Provider value={{ currUser, currUserMaps }}>
    {children}
  </UserContext.Provider>
);

export { UserProvider };
