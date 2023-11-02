import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Home";
import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";
import ProfileForm from "../profile/ProfileForm";
import Profile from "../profile/Profile";
import SaveMapForm from "../maps/SaveMapForm";
import AllMaps from "../maps/AllMaps";
function AllRoutes({ saveMap, login, signup, update }) {
  return (
    <Routes>
      <Route exact path="/" element={<Home />}></Route>
      <Route exact path="/login" element={<LoginForm login={login} />}></Route>
      <Route
        exact
        path="/signup"
        element={<SignupForm signup={signup} />}
      ></Route>
      <Route exact path="/all-maps" element={<AllMaps />}></Route>
      <Route
        exact
        path="/create-map"
        element={<SaveMapForm saveMap={saveMap} />}
      ></Route>
      <Route exact path="/profile" element={<Profile />}></Route>
      <Route
        exact
        path="/profile/update"
        element={<ProfileForm update={update} />}
      ></Route>
    </Routes>
  );
}

export default AllRoutes;
