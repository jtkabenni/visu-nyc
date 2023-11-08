import React, { useContext } from "react";
import UserContext from "../auth/UserContext";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
function NavBar({ logout, token }) {
  const { user } = useContext(UserContext);
  // const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  return (
    <nav>
      <div>
        <b className="logo">
          {" "}
          <Link to="/">Visu NYC</Link>
        </b>
      </div>
      <div>
        {token && user ? (
          //  || isAuthenticated
          <>
            {" "}
            {/* <button onClick={() => logout()}>Logout</button> */}
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
              <Link to="/profile">Hi, {user.username}</Link>
            </li>
            <li>
              <Link onClick={logout}>Logout</Link>
            </li>
          </>
        ) : (
          <>
            {/* <button onClick={() => loginWithRedirect()}>
              Login with Google
            </button> */}
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
