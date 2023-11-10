import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../auth/UserContext";
/** Form for creating a new snack or drink item.
 *
 * Has state for the name/quantity of the item; on submission,
 * sends {name, qty} to fn rec'd from parent.
 *
 */

const SaveMapForm = ({ saveMap }) => {
  const { user } = useContext(UserContext);

  const INITIAL_STATE = {
    name: "",
    file: null,
    notes: "",
  };
  const navigate = useNavigate();
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [formErrors, setFormErrors] = useState([]);
  /** Send {name, quantity} to parent
   *    & clear form. */

  async function handleSubmit(evt) {
    evt.preventDefault();
    let result = await saveMap(formData);
    if (result.success) {
      navigate("/profile");
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

  const handleUpload = (evt) => {
    evt.persist();

    setFormData((fData) => ({
      ...fData,
      file: evt.target.files[0],
    }));
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);
  /** render form */
  return (
    <div class="form-container">
      <form onSubmit={handleSubmit}>
        <h3>Add a new map</h3>

        <input
          placeholder="Name"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          placeholder="File"
          type="file"
          id="file"
          name="file"
          onChange={handleUpload}
        />

        <input
          placeholder="Notes"
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
        />
        {formErrors.map((e) => (
          <p className="error">{e}</p>
        ))}
        <button>Save</button>
      </form>
    </div>
  );
};

export default SaveMapForm;
