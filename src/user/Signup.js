import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { signup } from "./apiUser";

class Signup extends Component {
  state = {
    name: "",
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
    const { name, email, password } = this.state;
    const user = {
      name,
      email,
      password,
    };

    signup(user).then((data) => {
      if (data.error) this.setState({ error: data.error });
      else {
        this.setState({ redirect: true });
      }
    });
  };

  signupForm = (name, email, password) => (
    <form>
      {/* Name */}
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={this.handleChange("name")}
          type="text"
          className="form-control"
          value={name}
        ></input>
      </div>

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
          className="form-control"
          value={password}
        ></input>
      </div>

      <button
        className="btn btn-raised btn-primary mt-3 mb-3"
        onClick={this.handleSubmit}
      >
        Sign Up
      </button>
    </form>
  );

  render() {
    const { name, email, password, error, redirect } = this.state;
    if (redirect) {
      // return <Redirect to="/signup/success" />;
      return <Redirect to="/" />;
    }
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Sign up</h2>
        <hr />
        <br />

        <div
          className="alert alert-danger"
          style={{ display: error ? null : "none" }}
        >
          {error}
        </div>

        {this.signupForm(name, email, password)}
      </div>
    );
  }
}

export default Signup;
