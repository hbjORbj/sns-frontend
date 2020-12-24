import React, { Component } from "react";

class FollowProfileButton extends Component {
  render() {
    return (
      <div>
        {!this.props.following ? (
          <button className="btn btn-raised btn-success">Follow</button>
        ) : (
          <button className="btn btn-raised btn-warning">Unfollow</button>
        )}
      </div>
    );
  }
}

export default FollowProfileButton;
