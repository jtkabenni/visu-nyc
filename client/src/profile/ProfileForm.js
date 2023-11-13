import React, { useState, useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import UserContext from "../auth/UserContext";

/** Form for creating a new snack or drink item.
 *
 * Has state for the name/quantity of the item; on submission,
 * sends {name, qty} to fn rec'd from parent.
 *
 */

const ProfileForm = ({ update }) => {
  const { currUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: currUser.firstName,
    lastName: currUser.lastName,
    email: currUser.email,
    username: currUser.username,
    password: "",
  });
  const [formErrors, setFormErrors] = useState([]);

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
    let result = await update(updateData);
    if (result.success) {
      navigate("/profile");
    } else {
      console.log(result.errors);
      setFormErrors(result.errors);
    }
  }

  /** Update local state w/curr state of input elem */

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  };
  if (!currUser) {
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
          readOnly
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
        {formErrors.map((e) => (
          <p className="error">{e}</p>
        ))}
        <button>Update profile</button>
      </form>
    </div>
  );
};

export default ProfileForm;
