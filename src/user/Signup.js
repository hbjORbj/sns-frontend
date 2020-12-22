import React, { Component } from "react";
import { signup } from "./apiUser";

class Signup extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    error: "",
  };

  handleChange = (name) => (event) => {
    this.setState({
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
        this.setState({ name: "", email: "", password: "", error: "" });
      }
    });
  };

  signupForm = (name, email, password) => (
    <form>
      {/* Name */}
      <div className="form-component">
        <label>Name</label>
        <input
          onChange={this.handleChange("name")}
          type="text"
          value={name}
        ></input>
      </div>

      {/* Email */}
      <div className="form-component">
        <label>Email</label>
        <input
          onChange={this.handleChange("email")}
          type="text"
          value={email}
        ></input>
      </div>

      {/* Password */}
      <div className="form-component">
        <label>Password</label>
        <input
          onChange={this.handleChange("password")}
          type="text"
          value={password}
        ></input>
      </div>

      <button onClick={this.handleSubmit}>Sign Up</button>
    </form>
  );

  render() {
    const { name, email, password } = this.state;
    return (
      <div className="container">
        <h2>Sign up</h2>
        <hr />
        {this.signupForm(name, email, password)}
      </div>
    );
  }
}

export default Signup;