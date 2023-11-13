import React, { useContext } from "react";
import UserContext from "../auth/UserContext";
import { Link } from "react-router-dom";

function NavBar({ logout }) {
  const { currUser } = useContext(UserContext);

  return (
    <nav>
      <div>
        <b className="logo">
          {" "}
          <Link to="/">Visu NYC</Link>
        </b>
      </div>
      <div>
        {currUser ? (
          <>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/create-map">Save Map</Link>
            </li>
            <li>
              <Link to="/all-maps">All Maps</Link>
            </li>
            <li>
              <Link to="/profile">Hi, {currUser.firstName}</Link>
            </li>
            <li>
              <Link onClick={logout}>Logout</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/Login">Login</Link>
            </li>
            <li>
              <Link to="/Signup">Signup</Link>
            </li>
          </>
        )}
      </div>
    </nav>
  );
}
// end

export default NavBar;
