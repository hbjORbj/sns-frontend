import React from "react";
import { Link, withRouter } from "react-router-dom";
import { isUserLoggedIn } from "../auth";
import { getJwt, logout } from "../user/apiUser";

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
            to="/users"
            style={{
              color: isNavActive(history, "/users") ? "#fdcb6e" : "#ffffff",
            }}
          >
            Users
          </Link>
        </li>
        {!isUserLoggedIn() && (
          <>
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
                  color: isNavActive(history, "/signup")
                    ? "#fdcb6e"
                    : "#ffffff",
                }}
              >
                Sign Up
              </Link>
            </li>
          </>
        )}

        {isUserLoggedIn() && (
          <>
            <li className="nav-item">
              <Link
                className="nav-link"
                to={`/user/${getJwt().user._id}`}
                style={{
                  color: isNavActive(history, `/user/${getJwt().user._id}`)
                    ? "#fdcb6e"
                    : "#ffffff",
                }}
              >
                {`${getJwt().user.name}'s Profile`}
              </Link>
            </li>

            <li className="nav-item">
              <span
                style={{ cursor: "pointer", color: "#fff" }}
                className="nav-link"
                onClick={() => logout(() => history.push("/"))}
              >
                Logout
              </span>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default withRouter(Navigation);
