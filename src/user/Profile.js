import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getJwt, isUserLoggedIn } from "../auth";
import { readUser } from "./apiUser";
import DeleteUser from "./DeleteUser";
import DefaultAvatar from "../images/avatar.jpg";

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

  init(userId) {
    const token = isUserLoggedIn() ? getJwt().token : null;
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

  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.init(userId);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      const userId = this.props.match.params.userId;
      this.init(userId);
    }
  }

  render() {
    const { _id, name, email, created, error } = this.state;
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Profile</h2>
        <hr />
        <br />
        <div className="row">
          <div className="col-md-4">
            <img
              className="img-thumbnail"
              alt={`${name}'s Profile Image`}
              style={{ width: "auto", height: "250px" }}
              src={DefaultAvatar}
            />
          </div>
        </div>

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
            <Link
              className="btn btn-raised btn-info mr-5"
              to="/"
              style={{ width: "170px" }}
            >
              Create Post
            </Link>
            <Link
              className="btn btn-raised btn-success mr-5"
              to={`/user/edit/${_id}`}
              style={{ width: "170px" }}
            >
              Edit Profile
            </Link>
            <DeleteUser userId={_id} />
          </div>
        ) : (
          <button className="btn btn-raised btn-primary">Follow Button</button>
        )}
      </div>
    );
  }
}

export default Profile;
