import React, { useState, useContext } from "react";
import { useNavigate, Navigate, useRouteError } from "react-router-dom";
import UserContext from "../auth/UserContext";

import NycvisuApi from "../api/api";
/** Form for creating a new snack or drink item.
 *
 * Has state for the name/quantity of the item; on submission,
 * sends {name, qty} to fn rec'd from parent.
 *
 */

const ProfileForm = ({ update }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username,
    password: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  console.debug(
    "LoginForm",
    "login=",
    typeof login,
    "formData=",
    formData,
    "formErrors",
    formErrors
  );

  /** Send {name, quantity} to parent
   *    & clear form. */

  async function handleSubmit(evt) {
    evt.preventDefault();
    const updateData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    };
    const updatedUser = await NycvisuApi.updateUser(user.username, updateData);
    console.log(updatedUser);
    update(updatedUser);
    navigate("/");
  }

  /** Update local state w/curr state of input elem */

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  };
  if (!user) {
    return <Navigate to="/" />;
  }
  /** render form */

  return (
    <div class="form-container">
      <form onSubmit={handleSubmit}>
        <h3>Update profile</h3>
        <input
          placeholder="Username"
          id="username"
          name="username"
          value={formData.username}
          readonly
        />

        <input
          placeholder="Password"
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <input
          placeholder="Email"
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          placeholder="First name"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />

        <input
          placeholder="Last name"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />

        <button>Update profile</button>
      </form>
    </div>
  );
};

export default ProfileForm;
