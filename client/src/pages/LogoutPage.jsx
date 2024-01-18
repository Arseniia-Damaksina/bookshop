import { useState } from "react";
import axios from "axios";

import "./LogoutPage.css";
import Header from "../components/Header";

const LogoutPage = () => {
  const [message, setMessage] = useState("");
  const [logoutClicked, setLogoutClicked] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await axios.get("http://localhost:3000/logout", {
        withCredentials: true,
      });
      console.log(response)
      if (response.status === 200) {
        setLogoutClicked(true);
        setMessage("Logged out successfully");
      }
    } catch (error) {
      setLogoutClicked(true);
      setMessage("Logout failed");
    }
  };

  return (
    <div className="main-container">
      <Header />
      <div className="logoutContainer">
        {logoutClicked ? (
          <p>{message}</p>
        ) : (
          <div className="logout">
            <h1>Are you sure that you want to log out?</h1>
            <h2>If yes, click the button below.</h2>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LogoutPage;