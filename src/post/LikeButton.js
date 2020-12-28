import React, { Component } from "react";
import { followPost, unfollowPost } from "./apiPost";

class LikeButton extends Component {
  handleLike = () => {
    this.props.onButtonClick(followPost);
  };

  handleUnlike = () => {
    this.props.onButtonClick(unfollowPost);
  };

  render() {
    return (
      <div className="mb-2">
        {!this.props.amILiking ? (
          <button
            style={{ backgroundColor: "#3498db", color: "white" }}
            onClick={this.handleLike}
            className="btn btn-raised"
          >
            {this.props.likes.length} Like
          </button>
        ) : (
          <button
            style={{ backgroundColor: "#e74c3c", color: "white" }}
            onClick={this.handleUnlike}
            className="btn btn-raised"
          >
            {this.props.likes.length} Unlike
          </button>
        )}
      </div>
    );
  }
}

export default LikeButton;
