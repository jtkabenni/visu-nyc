import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import Auth0test from "./Auth0test";
/** Form for creating a new snack or drink item.
 *
 * Has state for the name/quantity of the item; on submission,
 * sends {name, qty} to fn rec'd from parent.
 *
 */

const LoginForm = ({ login }) => {
  const INITIAL_STATE = {
    username: "",
    password: "",
  };
  const navigate = useNavigate();
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [formErrors, setFormErrors] = useState([]);

  async function handleSubmit(evt) {
    evt.preventDefault();
    let result = await login(formData);
    if (result.success) {
      navigate("/");
    } else {
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

  /** render form */

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h3>Login</h3>

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

        {formErrors.map((e) => (
          <p className="error">{e}</p>
        ))}
        <button>Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
