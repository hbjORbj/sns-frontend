import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { getJwt, readUser } from "./apiUser";

class Profile extends Component {
  state = {
    name: "",
    email: "",
    created: "",
    following: [],
    followers: [],
    posts: [],
    error: "",
  };

  componentDidMount() {
    const token = isAuthenticated() ? getJwt().token : null;
    const userId = this.props.match.params.userId;
    readUser(userId, token).then((data) => {
      if (data.error) this.setState({ error: data.error });
      else {
        this.setState({
          name: data.name,
          email: data.email,
          created: data.created,
        });
      }
    });
  }

  render() {
    const { name, email, created, error } = this.state;
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Profile</h2>
        <hr />
        <br />
        <div
          className="alert alert-danger"
          style={{ display: error ? null : "none" }}
        >
          {error}
        </div>
        <div>
          <h2>{name}</h2>
          <h2>{email}</h2>
          <h2>{created}</h2>
        </div>
      </div>
    );
  }
}

export default Profile;
