import React, { Component } from "react";
import { listUsers } from "./apiUser";
import { Link } from "react-router-dom";
import DefaultAvatar from "../images/avatar.jpg";

class Users extends Component {
  state = {
    users: [],
    loading: true,
  };

  componentDidMount() {
    listUsers().then((data) => {
      if (data.error) {
      } else {
        this.setState({ users: data, loading: false });
      }
    });
  }

  render() {
    const { users, loading } = this.state;
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Users</h2>
        {loading ? (
          <div className="jumbotron">
            <h2 className="text-center">Loading...</h2>
          </div>
        ) : (
          <div className="row">
            {users.map((user, i) => (
              <div
                key={i}
                className="card col-md-2.75 m-3"
                style={{ width: "200px" }}
              >
                <img
                  className="card-img-top"
                  alt={`${user.name}'s Profile Image`}
                  style={{ width: "auto", height: "250px" }}
                  src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`}
                  onError={(i) => (i.target.src = `${DefaultAvatar}`)}
                />
                <div className="card-body">
                  <h5 className="card-title">{user.name}</h5>

                  <p className="card-text">{user.email}</p>
                  <p className="card-text">{`Joined on ${new Date(
                    user.created
                  ).toDateString()}`}</p>
                  <Link
                    to={`/user/${user._id}`}
                    className="btn btn-raised btn-primary btn-sm"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default Users;
