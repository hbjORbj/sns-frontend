import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { getJwt, readUser } from "./apiUser";

class EditProfile extends Component {
  state = {
    user: null,
    error: "",
  };

  componentDidMount() {
    const token = isAuthenticated() ? getJwt().token : null;
    const userId = this.props.match.params.userId;
    readUser(userId, token).then((data) => {
      if (data.error) this.setState({ error: data.error });
      else {
        this.setState({
          user: data.user,
        });
      }
    });
  }

  render() {
    return <div className="container"></div>;
  }
}

export default EditProfile;
