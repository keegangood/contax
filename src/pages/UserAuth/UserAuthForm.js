import { React, useState } from "react";

import "./scss/UserAuthForm.scss";

const UserAuthForm = ({ formAction, callApi }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: "",
    username: "",
  });

  // add new form changes to state
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    callApi(formData);
  };

  return (
    <form className="p-4 pb-4 mb-4" id="user-auth-form" onSubmit={onSubmit}>
      <div className="mb-4 form-group">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          name="email"
          value={formData.email}
          onChange={onChange}
        />
      </div>
      <div className="mb-4 form-group">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          name="password"
          value={formData.password}
          onChange={onChange}
        />
      </div>

      {/* display confirm password field if 'signup' */}
      {formAction === "signup" && (
        <div className="mb-4 form-group">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password2"
            value={formData.password2}
            onChange={onChange}
          />
        </div>
      )}

      <div className="mb-4 form-group">
        <button type="submit" className="btn btn-info w-100" id="submit-button">
          Submit
        </button>
      </div>
      {formAction === "login" && (
        <div className="mt-3">
          <a
            href="#"
            className="
            mt-3 
            text-decoration-none 
            small"
            id="forgot-password"
          >
            Forgot your password?
          </a>
        </div>
      )}
    </form>
  );
};

export default UserAuthForm;
