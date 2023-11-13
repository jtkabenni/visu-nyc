import React from "react";
import NycvisuApi from "../api/api";
import { useEffect, useState, useContext } from "react";
import UserContext from "../auth/UserContext";
import { Navigate } from "react-router-dom";
import SavedMapList from "./SavedMapList";

function AllMaps() {
  const { currUser } = useContext(UserContext);
  const [maps, setMaps] = useState([]);
  useEffect(
    function getMapsOnLoad() {
      async function maps() {
        const maps = await NycvisuApi.getMaps();
        setMaps(maps);
      }
      maps();
    },

    []
  );
  if (!currUser) {
    return <Navigate to="/" />;
  }
  return (
    <div class="container">
      <SavedMapList maps={maps}></SavedMapList>
    </div>
  );
}

export default AllMaps;
