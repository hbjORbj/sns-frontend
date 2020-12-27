import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { getJwt } from "../auth";
import { deletePost, getPost } from "./apiPost";

class SinglePost extends Component {
  state = {
    post: "",
    error: "",
    loading: true,
    redirect: false,
  };

  componentDidMount() {
    const postId = this.props.match.params.postId;
    getPost(postId).then((data) => {
      if (data.error) this.setState({ error: data.error });
      else {
        this.setState({ post: data });
        this.setState({ loading: false });
      }
    });
  }
  deletePost = () => {
    const token = getJwt().token;
    const postId = this.props.match.params.postId;
    deletePost(postId, token).then((data) => {
      if (data.error) console.log(data.error);
      else {
        this.setState({ redirect: true });
      }
    });
  };

  confirmDeletion = () => {
    let answer = window.confirm("Are you sure you want to delete your post?");
    if (answer) {
      this.deletePost();
    }
  };

  render() {
    const {
      post: { _id, title, body, created, postedBy },
      loading,
      redirect,
    } = this.state;

    if (redirect) {
      return <Redirect to="/" />;
    }
    const posterId = postedBy ? postedBy._id : "";
    const posterName = postedBy ? postedBy.name : "";
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">{title}</h2>
        <hr />
        <br />
        {loading ? (
          <div className="jumbotron text-center">
            <h2>Loading...</h2>
          </div>
        ) : (
          <div className="card-body">
            <img
              src={`${process.env.REACT_APP_API_URL}/post/photo/${_id}`}
              alt={`${title}'s image`}
              onError={(i) => (i.target.src = "")}
              className="img-thumbnail mb-5"
              style={{ width: "50%", height: "300px" }}
            />
            <p className="card-text">{body}</p>
            <br />
            <p className="font-italic mark">
              Posted by <Link to={`/user/${posterId}`}>{posterName} </Link>
              on {new Date(created).toDateString()}
            </p>
            <div>
              <Link
                to="/"
                className="btn btn-raised btn-primary btn-sm mr-3"
                style={{ width: "125px" }}
              >
                Back to posts
              </Link>
              {getJwt() && getJwt().user._id == posterId && (
                <>
                  <Link
                    to={`/post/edit/${_id}`}
                    className="btn btn-raised btn-success btn-sm mr-3"
                    style={{ width: "125px" }}
                  >
                    Edit Post
                  </Link>
                  <button
                    className="btn btn-raised btn-danger btn-sm"
                    style={{ width: "125px" }}
                    onClick={this.confirmDeletion}
                  >
                    Delete Post
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default SinglePost;
