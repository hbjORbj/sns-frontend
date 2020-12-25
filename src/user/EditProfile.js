import React, { Component, isValidElement } from "react";
import { Redirect } from "react-router-dom";
import { getJwt, isUserLoggedIn, updateJwt } from "../auth";
import { readUser, updateUser } from "./apiUser";

class EditProfile extends Component {
  state = {
    _id: "",
    name: "",
    email: "",
    redirect: false,
    error: "",
  };

  componentDidMount() {
    const token = isUserLoggedIn() ? getJwt().token : null;
    const userId = this.props.match.params.userId;

    readUser(userId, token).then((data) => {
      if (data.error) this.setState({ redirect: true });
      else {
        this.setState({
          _id: data._id,
          name: data.name,
          email: data.email,
          error: "",
        });
      }
    });
  }

  handleChange = (name) => (event) => {
    this.setState({
      error: "",
      [name]: event.target.value,
    });
  };

  updateAccount = (event) => {
    event.preventDefault();
    const token = isUserLoggedIn() ? getJwt().token : null;
    const userId = this.props.match.params.userId;
    const { _id, name, email } = this.state;
    const user = {
      _id,
      name,
      email,
    };
    updateUser(userId, token, user).then((data) => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        updateJwt(data, () =>
          this.setState({
            redirect: true,
          })
        );
      }
    });
  };

  confirmUpdate = (event) => {
    event.preventDefault();
    if (this.isValid()) {
      let answer = window.confirm(
        "Are you sure you want to update your profile?"
      );
      if (answer) {
        this.updateAccount(event);
      }
    }
  };

  isValid = () => {
    const { name, email } = this.state;
    if (name.length === 0) {
      this.setState({ error: "Type your name." });
      return false;
    }
    if (!/.+\@.+\..+/.test(email)) {
      this.setState({ error: "Invalid email address." });
      return false;
    }
    return true;
  };

  signupForm = (name, email) => (
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

      <button
        className="btn btn-raised btn-primary mt-3 mb-3"
        onClick={this.confirmUpdate}
      >
        Update Profile
      </button>
    </form>
  );

  render() {
    const { _id, name, email, redirect, error } = this.state;
    if (redirect) {
      return <Redirect to={`/user/${_id}`} />;
    }
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Edit Profile</h2>
        <hr />
        <br />
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>
        {isUserLoggedIn() &&
          getJwt().user._id === _id &&
          this.signupForm(name, email)}
      </div>
    );
  }
}

export default EditProfile;
