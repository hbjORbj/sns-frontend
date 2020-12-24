import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { deleteUser, getJwt, logout } from "./apiUser";

class DeleteUser extends Component {
  state = {
    redirect: false,
  };
  deleteAccount = () => {
    const token = getJwt().token;
    const userId = this.props.userId;
    deleteUser(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        // log out user
        logout(() =>
          console.log("User's account has been successfully deleted.")
        );
        // redirect
        this.setState({ redirect: true });
      }
    });
  };

  confirmDeletion = () => {
    let answer = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (answer) {
      this.deleteAccount();
    }
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <button
        onClick={this.confirmDeletion}
        className="btn btn-raised btn-danger"
      >
        Delete Account
      </button>
    );
  }
}

export default DeleteUser;
