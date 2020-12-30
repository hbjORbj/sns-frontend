import React, { Component } from "react";
import { resetPassword } from "../auth";

class ResetPassword extends Component {
  state = {
    newPassword: "",
    error: "",
    message: "",
  };

  resetPassword = (event) => {
    event.preventDefault();
    this.setState({ message: "", error: "" });
    const { newPassword } = this.state;
    const resetPasswordLink = this.props.match.params.resetPasswordToken;
    resetPassword(newPassword, resetPasswordLink).then((data) => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        this.setState({ message: data.message, newPassword: "" });
      }
    });
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
