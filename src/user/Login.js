import React, { Component } from "react";
import { login } from "./apiUser";

class Login extends Component {
  state = {
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
    const { email, password } = this.state;
    const user = {
      email,
      password,
    };
    login(user).then((data) => {
      if (data.error) this.setState({ error: data.error });
      else {
        this.setState({ email: "", password: "" });
      }
    });
  };

  loginForm = (email, password) => (
    <form>
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
      <button onClick={this.handleSubmit}>Login</button>
    </form>
  );

  render() {
    const { email, password } = this.state;
    return (
      <div className="container">
        <h2>Login</h2>
        <hr />
        {this.loginForm(email, password)}
      </div>
    );
  }
}

export default Login;
