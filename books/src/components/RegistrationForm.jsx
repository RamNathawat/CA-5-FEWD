import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import "./RegistrationForm.css";

function RegistrationForm() {
  // State to manage the form submission status
  const [submitBool, setSubmitBool] = useState(false);

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  // Function to handle form submission
  const onFormSubmit = (data) => {
    setSubmitBool(true);
  };

  // Function to render form fields with labels and error messages
  function renderFormField(labelText, name, rules) {
    return (
      <div>
        <label
          htmlFor={name}
          className="input-label"
          style={{ textAlign: "left" }}
        >
          {labelText}
        </label>
        <br />
        <input
          type={name.includes("password") ? "password" : "text"}
          placeholder={labelText}
          id={name}
          className="input-field"
          {...register(name, rules)}
        />
        {errors[name] && errors[name].type === "required" && (
          <p className="error-message">{`${labelText} is required`}</p>
        )}
        {errors[name] && errors[name].type === "minLength" && (
          <p className="error-message">{`${labelText} should have a minimum of 3 characters`}</p>
        )}
        {errors[name] && errors[name].type === "maxLength" && (
          <p className="error-message">{`${labelText} can only have a maximum of 30 characters`}</p>
        )}
        {errors[name] && errors[name].type === "pattern" && (
          <p className="error-message">{`Enter a valid ${labelText.toLowerCase()}`}</p>
        )}
        {errors[name] && errors[name].type === "validate" && (
          <p className="error-message">Passwords must match</p>
        )}
      </div>
    );
  }

  return (
    <div className="registration-container">
      <div className="header-container">
        {/* Logo and link to home */}
        <NavLink to="/" className="logo-link">
          <h2>Kalvium Library</h2>
        </NavLink>
      </div>
      <div className="main-content">
        <p className="heading">Sign Up now to read your favorite books! </p>
        {submitBool ? (
          // Display success message after successful registration
          <div className="registration-message">
            <h2 className="registration-success">Registration Successful!</h2>
            <p className="read-joy">Read with joy ❤️!</p>
          </div>
        ) : (
          // Display the registration form
          <form
            onSubmit={handleSubmit(onFormSubmit)}
            className="form-container"
          >
            {renderFormField("Name", "firstName", {
              required: true,
              minLength: 3,
              maxLength: 30,
            })}
            {renderFormField("Email", "email", {
              required: true,
              pattern: /^\S+@\S+$/i,
            })}
          {renderFormField("Password", "password", {
            required: true,
            minLength: 8,  // Increase the minimum length for stronger passwords
            pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_]).*$/,  // Ensure at least one uppercase letter, one digit, and one special character
        })}

            {renderFormField("Confirm password", "confirmPassword", {
              validate: (value) => value === watch("password"),
            })}
            <button
              type="submit"
              className="submit-button"
              disabled={false} // Placeholder for dynamic disabling logic
            >
              Sign Up
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default RegistrationForm;
