import React, { useContext } from "react";
import UserContext from "../auth/UserContext";

import SavedMapList from "../maps/SavedMapList";
import { Link } from "react-router-dom";

function Profile() {
  const { currUser, currUserMaps } = useContext(UserContext);

  return (
    <>
      <div className="container">
        {currUser ? (
          <div className="profile-sections">
            <div className="profile-details">
              <h3>
                {currUser.firstName} {currUser.lastName}
              </h3>
              <div className="profile-detail">
                <p>
                  <b>Username</b>
                </p>
                <p> {currUser.username}</p>
              </div>
              <div className="profile-detail">
                <p>
                  <b>Email address</b>
                </p>
                <p> {currUser.email}</p>
              </div>
              <div className="profile-detail">
                <p>
                  <b>Total maps</b>
                </p>
                <p> {currUser.maps.length} maps</p>
              </div>

              <button>
                <Link to="/profile/update">Update</Link>
              </button>
            </div>

            <SavedMapList maps={currUserMaps}></SavedMapList>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
export default Profile;
