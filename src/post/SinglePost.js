import React, { Component } from "react";
import { getPost } from "./apiPost";

class SinglePost extends Component {
  state = {
    post: null,
    error: "",
  };

  componentDidMount() {
    const postId = this.props.match.params.postId;
    getPost(postId).then((data) => {
      if (data.error) this.setState({ error: data.error });
      else {
        this.setState({ post: data });
      }
    });
  }

  render() {
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Single Post</h2>
        <hr />
        <br />
      </div>
    );
  }
}

export default SinglePost;
