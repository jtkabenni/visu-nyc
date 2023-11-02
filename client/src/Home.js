import React, { useContext, useEffect } from "react";
import UserContext from "./auth/UserContext";
import Map from "./kepler/Map";
import { Link } from "react-router-dom";

function Home() {
  const { user } = useContext(UserContext);
  return (
    <div class="map-container">
      {user ? (
        <>
          <h1 class="map">Welcome back, {user.firstName}</h1>
          <p class="map">
            Save a map to your account by clicking on Share {">"} export image
            locally. Then, navigate over to{" "}
            <Link to="/create-map">Save Map</Link> to upload your new map.
          </p>
        </>
      ) : (
        ""
      )}
      <Map />
    </div>
  );
}

export default Home;
