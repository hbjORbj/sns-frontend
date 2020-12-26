import React, { Component, isValidElement } from "react";
import { Redirect } from "react-router-dom";
import { getJwt, isUserLoggedIn, updateJwt } from "../auth";
import { readUser, updateUser } from "./apiUser";

class EditProfile extends Component {
  state = {
    _id: "",
    name: "",
    email: "",
    about: "",
    fileSize: 0,
    redirect: false,
    loading: true,
    error: "",
  };

  componentDidMount() {
    this.userData = new FormData();
    const token = isUserLoggedIn() ? getJwt().token : null;
    const userId = this.props.match.params.userId;

    readUser(userId, token).then((data) => {
      if (data.error) this.setState({ redirect: true });
      else {
        this.setState({
          _id: data._id,
          name: data.name,
          email: data.email,
          about: data.about,
          error: "",
          loading: false,
        });
      }
    });
  }

  handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    const fileSize = name === "photo" ? event.target.files[0].size : 0;
    this.userData.set(name, value);
    this.setState({
      error: "",
      [name]: value,
      fileSize,
    });
  };

  updateAccount = (event) => {
    event.preventDefault();
    const token = isUserLoggedIn() ? getJwt().token : null;
    const userId = this.props.match.params.userId;
    updateUser(userId, token, this.userData).then((data) => {
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
    const { name, email, fileSize } = this.state;
    if (fileSize > 1000000) {
      this.setState({
        error: "File size should be less than 1 MB",
      });
      return false;
    }
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

  updateForm = (name, email, about) => (
    <form>
      {/* Profile Image */}
      <div className="form-group">
        <label className="text-muted">Profile Image</label>
        <input
          onChange={this.handleChange("photo")}
          type="file"
          accept="image/*"
          className="form-control"
        ></input>
      </div>

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

      {/* About */}
      <div className="form-group">
        <label className="text-muted">About</label>
        <input
          onChange={this.handleChange("about")}
          type="text"
          value={about}
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
    const { _id, name, email, redirect, error, about, loading } = this.state;
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
        {loading ? (
          <div className="jumbotron">
            <h2 className="text-center">Loading...</h2>
          </div>
        ) : (
          <div>
            {isUserLoggedIn() &&
              getJwt().user._id === _id &&
              this.updateForm(name, email, about)}
          </div>
        )}
      </div>
    );
  }
}

export default EditProfile;
