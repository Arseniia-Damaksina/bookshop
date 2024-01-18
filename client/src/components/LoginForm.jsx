import PropTypes from "prop-types";
import "./LoginForm.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import validateEmail from "../utils/validateEmail.js";
import validatePassword from "../utils/validatePassword.js";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailIsValid = validateEmail(email);
    const passwordIsValid = validatePassword(password);
    if (emailIsValid && passwordIsValid) {
      const data = {
        email: email,
        password: password,
      };
      const postLogin = async () => {
        try {
          const res = await axios.post("http://localhost:3000/login", data, {
            withCredentials: true,
          });
          console.log(res);
          console.log(res.status);
          if (res.status !== 200) {
            throw new Error("Error while login");
          } else {
            if (res.data.success) {
              navigate("/bookstore");
            }
          }
          setEmail("");
          setPassword("");
        } catch {
          setError("Error while log in");
        }
      };
      postLogin();
    } else {
      setError("Email or password is not valid");
    }
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="form-component">
      <p>{error}</p>
      {/* <p>{message}</p> */}
      <div className="form-container">
        <h1>Login form</h1>
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
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;