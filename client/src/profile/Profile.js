import React, { useContext } from "react";
import UserContext from "../auth/UserContext";

import SavedMapList from "../maps/SavedMapList";
import { Link } from "react-router-dom";

function Profile() {
  const { user } = useContext(UserContext);
  console.log(user);
  return (
    <div class="container">
      {user ? (
        <div class="profile-sections">
          <div class="profile-details">
            <h3>
              {user.firstName} {user.lastName}
            </h3>
            <div class="profile-detail">
              <p>
                <b>Username</b>
              </p>
              <p> {user.username}</p>
            </div>
            <div class="profile-detail">
              <p>
                <b>Email address</b>
              </p>
              <p> {user.email}</p>
            </div>
            <div class="profile-detail">
              <p>
                <b>Total maps</b>
              </p>
              <p> {user.maps.length} maps</p>
            </div>

            <button>
              <Link to="/profile/update">Update</Link>
            </button>
          </div>

          <SavedMapList maps={user.maps}></SavedMapList>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
export default Profile;
