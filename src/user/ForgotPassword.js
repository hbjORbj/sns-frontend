import React, { Component } from "react";
import { sendPasswordResetLink } from "../auth";

class ForgotPassword extends Component {
  state = {
    email: "",
    message: "",
    error: "",
  };

  isValid = () => {
    const { email } = this.state;
    if (email.length == 0) {
      this.setState({ error: "Type your email address." });
      return false;
    }
    if (!/.+\@.+\..+/.test(email)) {
      this.setState({ error: "Invalid email address." });
      return false;
    }
    return true;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ message: "", error: "" });
    if (this.isValid()) {
      sendPasswordResetLink(this.state.email).then((data) => {
        if (data.error) this.setState({ error: data.error });
        else this.setState({ message: data.message });
      });
    }
  };

  render() {
    const { email, message, error } = this.state;

    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Forgot Password</h2>
        <hr />
        <br />
        {message && <div className="alert alert-info">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              className="form-control"
              placeholder="Your Email Address"
              value={email}
              name="email"
              type="email"
              onChange={(e) =>
                this.setState({ email: e.target.value, error: "", message: "" })
              }
              autoFocus
            />
          </div>
          <button className="btn btn-raised btn-primary" type="submit">
            Send Reset Link
          </button>
        </form>
      </div>
    );
  }
}

export default ForgotPassword;
