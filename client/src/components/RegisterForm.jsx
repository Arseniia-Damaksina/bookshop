import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./RegisterForm.css";

import validateEmail from "../utils/validateEmail.js";
import validatePassword from "../utils/matchPasswords.js";
import matchPasswords from "../utils/matchPasswords.js";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValidEmail = validateEmail(email);
    const isValidPassword = validatePassword(password);
    const isMatch = matchPasswords(password, confirmPassword);
    console.log(isValidEmail, isValidPassword, isMatch)
    
    if (isMatch && isValidEmail && isValidPassword) {
    } else {
      setError("Please, fill in all the fields correctly");
    }
    const data = {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };

    const postRegister = async () => {
      try {
        const res = await axios.post("http://localhost:3000/register", data);
        if (res.status !== 201) {
          throw new Error("Error while creating a new user");
        } else {
          if (res.data.success) {
            setMessage("The account is created successfully, please log in");
            navigate('/login')
          }
        }
      } catch (err) {
        setError(err.message);
      }
    };
    postRegister();
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <div className="form-component">
      <p>{error}</p>
      <p>{message}</p>
      <div className="form-container">
        <h1>Register Form</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => handleEmail(e)}
          />
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => handlePassword(e)}
          />
          <label htmlFor="confirmPassword">Confirm Password: </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => handleConfirmPassword(e)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;