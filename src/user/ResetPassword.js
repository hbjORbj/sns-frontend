import React, { Component } from "react";
import { resetPassword } from "../auth";

class ResetPassword extends Component {
  state = {
    newPassword: "",
    error: "",
    message: "",
  };

  isValid = () => {
    const { newPassword } = this.state;
    if (newPassword.length == 0) {
      this.setState({ error: "Type your new password." });
      return false;
    }
    if (newPassword.length < 6) {
      this.setState({ error: "Password must contain at least 6 characters." });
      return false;
    }
    if (!/\d/.test(newPassword)) {
      this.setState({ error: "Password must contain one or more numbers." });
      return false;
    }
    return true;
  };

  resetPassword = (event) => {
    event.preventDefault();
    this.setState({ message: "", error: "" });
    const { newPassword } = this.state;
    const resetPasswordLink = this.props.match.params.resetPasswordToken;
    if (this.isValid()) {
      resetPassword(newPassword, resetPasswordLink).then((data) => {
        if (data.error) {
          this.setState({ error: data.error });
        } else {
          this.setState({ message: data.message, newPassword: "" });
        }
      });
    }
  };

  render() {
    const { message, error } = this.state;
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Reset Password</h2>
        <hr />
        <br />
        {message && <div className="alert alert-info">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={this.resetPassword}>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Your new password"
              value={this.state.newPassword}
              name="newPassword"
              onChange={(e) =>
                this.setState({
                  newPassword: e.target.value,
                  message: "",
                  error: "",
                })
              }
              autoFocus
            />
          </div>
          <button type="submit" className="btn btn-raised btn-primary">
            Reset Password
          </button>
        </form>
      </div>
    );
  }
}

export default ResetPassword;
