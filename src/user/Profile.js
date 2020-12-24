import React, { Component } from "react";
import { isUserLoggedIn } from "../auth";
import { getJwt, readUser } from "./apiUser";
import FollowProfileButton from "./FollowProfileButton";

class Profile extends Component {
  state = {
    _id: "",
    name: "",
    email: "",
    created: "",
    following: [],
    followers: [],
    posts: [],
    error: "",
  };

  componentDidMount() {
    const token = isUserLoggedIn() ? getJwt().token : null;
    const userId = this.props.match.params.userId;
    readUser(userId, token).then((data) => {
      if (data.error) this.setState({ error: data.error });
      else {
        this.setState({
          _id: data._id,
          name: data.name,
          email: data.email,
          created: data.created,
        });
      }
    });
  }

  render() {
    const { _id, name, email, created, error } = this.state;
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
        <div className="lead">
          <p>Hello, {name}</p>
          <p>Email: {email}</p>
          <p>{`Joined on ${new Date(created).toDateString()}`}</p>
        </div>

        {isUserLoggedIn() && getJwt().user && getJwt().user._id === _id ? (
          <div>
            {/* <Link className="btn btn-raised btn-info mr-5" to="/">
              Create Post
            </Link>
            <Link className="btn btn-raised btn-success" to="/">
              Edit Profile
            </Link> */}
          </div>
        ) : (
          <FollowProfileButton></FollowProfileButton>
        )}
      </div>
    );
  }
}

export default Profile;
