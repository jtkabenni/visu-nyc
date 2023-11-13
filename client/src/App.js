// import logo from "./logo.svg";
// import "./App.css";
import React, { useState, useEffect } from "react";
import AllRoutes from "./routes-nav/AllRoutes";
import NavBar from "./routes-nav/NavBar";
import NycvisuApi from "./api/api";
import { BrowserRouter } from "react-router-dom";
import jwt_decode from "jwt-decode";
import UserContext from "./auth/UserContext";
import AppFooter from "./AppFooter";
import { useAuth0 } from "@auth0/auth0-react";
function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const {
    user: auth0User,
    loginWithRedirect,
    logout: authLogout,
    isAuthenticated,
  } = useAuth0();
  const [currUser, setCurrUser] = useState(null);
  const [currUserMaps, setCurrUserMaps] = useState([]);

  // const [allMaps, setAllMaps] = useState[]

  async function login(loginData) {
    try {
      let token = await NycvisuApi.login(loginData);
      setToken(token);
      localStorage.setItem("token", token);
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }

  async function signup(signupData) {
    try {
      let token = await NycvisuApi.signup(signupData);
      setToken(token);
      localStorage.setItem("token", token);
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }

  async function saveMap(data) {
    try {
      const newMap = await NycvisuApi.saveMap(currUser.username, data);
      console.log(newMap);
      setCurrUserMaps([...currUser.maps, newMap]);
      return { success: true };
    } catch (errors) {
      console.error("save map failed", errors);
      return { success: false, errors };
    }
  }

  function logout() {
    setToken(null);
    localStorage.removeItem("token");
    setCurrUser(null);
    authLogout();
  }

  async function update(data) {
    try {
      const result = await NycvisuApi.updateUser(currUser.username, data);
      console.log(result);
      return { success: true };
    } catch (errors) {
      console.error("update user failed", errors);
      return { success: false, errors };
    }
  }

  useEffect(
    function getUser() {
      async function user() {
        if (token) {
          NycvisuApi.token = token;
          const decoded = jwt_decode(token);
          const user = await NycvisuApi.getUser(decoded.username);
          console.log(user);
          setCurrUserMaps(user.maps);
          setCurrUser(user);
        } else if (isAuthenticated) {
          NycvisuApi.token = "auth0";
          const user = await NycvisuApi.getAuth0User(auth0User.sub);
          console.log(user);
          setCurrUserMaps(user.maps);
          setCurrUser(user);
        }
      }
      user();
    },

    [token, isAuthenticated]
  );

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={{ currUser, setCurrUser, currUserMaps }}>
          <NavBar logout={logout} token={token}></NavBar>
          <AllRoutes
            saveMap={saveMap}
            login={login}
            signup={signup}
            update={update}
          ></AllRoutes>
          <AppFooter />
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
