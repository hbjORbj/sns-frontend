import React, { Component } from "react";
import { listUsers } from "./apiUser";
import DefaultAvatar from "../images/avatar.jpg";

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
                src={DefaultAvatar}
                alt={`${user.name}'s Profile Image`}
                style={{ width: "100%", height: "16vw", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>

                <p className="card-text">{user.email}</p>
                <p className="card-text">{`Joined on ${new Date(
                  user.created
                ).toDateString()}`}</p>
                <button className="btn btn-raised btn-primary">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Users;
