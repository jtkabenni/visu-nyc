import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import NycvisuApi from "../api/api";
/** Form for creating a new snack or drink item.
 *
 * Has state for the name/quantity of the item; on submission,
 * sends {name, qty} to fn rec'd from parent.
 *
 */

const SignupForm = ({ signup }) => {
  const INITIAL_STATE = {
    username: "",
    password: "",
  };
  const navigate = useNavigate();
  const [formData, setFormData] = useState(INITIAL_STATE);

  /** Send {name, quantity} to parent
   *    & clear form. */

  async function handleSubmit(evt) {
    evt.preventDefault();
    const token = await NycvisuApi.signup(formData);
    console.log(token);
    signup(token);
    setFormData(INITIAL_STATE);
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

  /** render form */

  return (
    <div class="form-container">
      <form onSubmit={handleSubmit}>
        <h3>Sign up</h3>

        <input
          placeholder="Username"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
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
          placeholder="Last Name"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />

        <button>Sign up</button>
      </form>
    </div>
  );
};

export default SignupForm;
