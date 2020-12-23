import React from "react";
import { Link } from "react-router-dom";

export const Navigation = () => (
  <div>
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <Link className="nav-link" to="/">
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          Log In
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/signup">
          Sign Up
        </Link>
      </li>
    </ul>
  </div>
);
