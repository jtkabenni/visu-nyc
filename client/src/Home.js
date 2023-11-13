import React, { useContext, useState } from "react";
import UserContext from "./auth/UserContext";
import Map from "./kepler/Map";
import { Link } from "react-router-dom";

function Home() {
  const [dataType, setDataType] = useState("trees");
  const { currUser } = useContext(UserContext);

  async function changeMap(type) {
    console.log(type);
    setDataType(type);
  }
  return (
    <>
      <div>
        <div className="home-info">
          <div className="maptype-buttons">
            <button
              className={`maptype-button ${
                dataType === "trees" ? "selected" : ""
              }`}
              onClick={() => changeMap("trees")}
            >
              Trees
            </button>
            <button
              className={`maptype-button ${
                dataType === "restaurants" ? "selected" : ""
              }`}
              onClick={() => changeMap("restaurants")}
            >
              Restaurants
            </button>
          </div>
          {currUser ? (
            <>
              <p className="map-instructions">
                Save a map to your account by clicking on Share {">"} Export
                Image, and saving locally. Then, navigate to{" "}
                <Link to="/create-map">Save Map</Link> to upload your new map.
              </p>
              <div></div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>

      <Map dataType={dataType} />
    </>
  );
}

export default Home;
