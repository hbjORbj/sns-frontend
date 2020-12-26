import React, { Component } from "react";
import { getJwt } from "../auth";
import { followUser, unfollowUser } from "./apiUser";

class FollowButton extends Component {
  handleFollow = () => {
    this.props.onButtonClick(followUser);
  };

  handleUnfollow = () => {
    this.props.onButtonClick(unfollowUser);
  };

  render() {
    return (
      <div>
        {!this.props.amIFollowing ? (
          <button
            onClick={this.handleFollow}
            className="btn btn-raised btn-success"
          >
            Follow
          </button>
        ) : (
          <button
            onClick={this.handleUnfollow}
            className="btn btn-raised btn-warning"
          >
            Unfollow
          </button>
        )}
      </div>
    );
  }
}

export default FollowButton;
