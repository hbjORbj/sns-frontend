import React, { Component } from "react";
import { listUsers } from "./apiUser";
import DefaultAvatar from "../images/avatar.jpg";
import { Link } from "react-router-dom";

class Users extends Component {
  state = {
    users: [],
  };

  componentDidMount() {
    listUsers().then((data) => {
      if (data.error) {
      } else {
        this.setState({ users: data });
      }
    });
  }

  render() {
    const { users } = this.state;
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Users</h2>

        <div className="row">
          {users.map((user, i) => (
            <div key={i} className="card col-md-3 m-3">
              <img
                className="card-img-top"
                alt={`${user.name}'s Profile Image`}
                style={{ width: "auto", height: "250px" }}
                src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`}
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
      </div>
    );
  }
}

export default Users;
