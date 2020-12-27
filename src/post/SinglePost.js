import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getPost } from "./apiPost";

class SinglePost extends Component {
  state = {
    post: "",
    error: "",
    loading: true,
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

  render() {
    const {
      post: { _id, title, body, created, postedBy },
      loading,
    } = this.state;
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
              className="img-thumbnail mb-3"
              style={{ width: "50%", height: "300px" }}
            />
            <p className="card-text">{body}</p>
            <br />
            <p className="font-italic mark">
              Posted by <Link to={`/user/${posterId}`}>{posterName} </Link>
              on {new Date(created).toDateString()}
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default SinglePost;
