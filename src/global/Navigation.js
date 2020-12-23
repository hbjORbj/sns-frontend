import React from "react";
import { Link, withRouter } from "react-router-dom";

const isNavActive = (history, path) => {
  return history.location.pathname === path;
};

const Navigation = ({ history }) => {
  return (
    <div>
      <ul className="nav nav-tabs bg-primary">
        <li className="nav-item">
          <Link
            className="nav-link"
            to="/"
            style={{ color: isNavActive(history, "/") ? "#fdcb6e" : "#ffffff" }}
          >
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            to="/login"
            style={{
              color: isNavActive(history, "/login") ? "#fdcb6e" : "#ffffff",
            }}
          >
            Log In
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            to="/signup"
            style={{
              color: isNavActive(history, "/signup") ? "#fdcb6e" : "#ffffff",
            }}
          >
            Sign Up
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default withRouter(Navigation);
