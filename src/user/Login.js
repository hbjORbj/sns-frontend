import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { authenticate } from "../auth";
import { login } from "./apiUser";

class Login extends Component {
  state = {
    email: "",
    password: "",
    error: "",
    redirect: false,
  };

  handleChange = (name) => (event) => {
    this.setState({
      error: "",
      [name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    const user = {
      email,
      password,
    };
    login(user).then((data) => {
      if (data.error) this.setState({ error: data.error });
      else {
        // authenticate
        authenticate(data, () => {
          this.setState({ redirect: true });
        });
      }
    });
  };

  loginForm = (email, password) => (
    <form>
      {/* Email */}
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={this.handleChange("email")}
          type="text"
          value={email}
          className="form-control"
        ></input>
      </div>

      {/* Password */}
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={this.handleChange("password")}
          type="text"
          value={password}
          className="form-control"
        ></input>
      </div>
      <button
        className="btn btn-raised btn-primary mt-3 mb-3"
        onClick={this.handleSubmit}
      >
        Login
      </button>
    </form>
  );

  render() {
    const { email, password, error, redirect } = this.state;
    if (redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Login</h2>
        <hr />
        <br />
        <div
          className="alert alert-danger"
          style={{ display: error ? null : "none" }}
        >
          {error}
        </div>

        {this.loginForm(email, password)}
      </div>
    );
  }
}

export default Login;
