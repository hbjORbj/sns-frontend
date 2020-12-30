import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getJwt } from "../auth";
import { deleteComment, postComment } from "./apiPost";

class Comment extends Component {
  state = {
    text: "",
    error: "",
  };

  isValid = () => {
    const { text } = this.state;
    if (text.length == 0) {
      this.setState({ error: "Comment cannot be empty." });
      return false;
    } else if (text.length > 150) {
      this.setState({ error: "Comment should be less than 150 characters." });
      return false;
    }
    return true;
  };

  handleChange = (event) => {
    this.setState({ error: "", text: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (!getJwt()) {
      this.setState({ error: "Please sign in to leave a comment." });
      return false;
    }

    if (this.isValid()) {
      const { token, user } = getJwt();
      postComment(user._id, this.props.postId, token, {
        text: this.state.text,
      }).then((data) => {
        console.log(data);
        if (data.error) this.setState({ error: data.error });
        else {
          this.setState({
            text: "",
          });
          this.props.updateComments(data.comments);
        }
      });
    }
  };

  confirmDeletion = (comment) => {
    let answer = window.confirm(
      "Are you sure you want to delete your comment?"
    );
    if (answer) {
      this.handleDeletion(comment);
    }
  };

  handleDeletion = (comment) => {
    const { token, user } = getJwt();
    deleteComment(user._id, this.props.postId, token, comment).then((data) => {
      if (data.error) console.log(data.error);
      else {
        this.props.updateComments(data.comments);
      }
    });
  };

  render() {
    const { text, error } = this.state;
    const { comments } = this.props;
    return (
      <div className="mt-5 mb-5">
        {/* Type Comment */}
        <h2 className="text-primary">Leave a comment</h2>
        <form onSubmit={this.handleSubmit} className="mt-3 mb-3">
          <div className="form-group">
            <input
              type="text"
              onChange={this.handleChange}
              value={text}
              className="form-control"
              placeholder="Leave a comment..."
            />
            <button type="submit" className="btn btn-raised btn-primary mt-3">
              Post
            </button>
          </div>
        </form>

        {/* Error */}
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>

        {/* All Comments */}
        <div>
          <h3 className="text-primary">
            {comments ? comments.length : 0} Comments
          </h3>
          <hr />
          {comments.reverse().map((comment, i) => (
            <div key={i}>
              <div className="row">
                <Link>
                  <img
                    style={{
                      borderRadius: "50%",
                      border: "1px solid black",
                      height: "30px",
                      width: "30px",
                    }}
                    className="ml-3 mr-2"
                    alt={comment.postedBy.name}
                    src={`${process.env.REACT_APP_API_URL}/user/photo/${comment.postedBy._id}`}
                  />
                </Link>
                <p className="lead">{comment.text}</p>
              </div>
              <div>
                <p className="font-italic mark">
                  Posted by{" "}
                  <Link to={`/user/${comment.postedBy._id}`}>
                    {comment.postedBy.name}{" "}
                  </Link>
                  on {` ${new Date(comment.created).toDateString()}`}
                  <span>
                    {getJwt().user &&
                      getJwt().user._id == comment.postedBy._id && (
                        <span
                          style={{ cursor: "pointer" }}
                          className="text-danger float-right mr-1"
                          onClick={() => this.confirmDeletion(comment)}
                        >
                          Delete
                        </span>
                      )}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Comment;
