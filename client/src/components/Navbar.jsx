import "./Navbar.css";
import getCookieValue from "../utils/getCookieValue";

import { Link } from "react-router-dom";

const Navbar = () => {
  const id = getCookieValue("id");

  return (
    <div className="navbar">
      <ul>
        <li>
          <Link to="/bookstore">Home</Link>
        </li>
        <li>
          <Link to="/add-book">Add Book</Link>
        </li>
        {id ? (
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        ) : (
          <>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
