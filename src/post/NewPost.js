import React, { Component, isValidElement } from "react";
import { Redirect } from "react-router-dom";
import { getJwt } from "../auth";
import { createPost } from "./apiPost";

class NewPost extends Component {
  state = {
    title: "",
    body: "",
    photo: null,
    error: "",
    user: null,
    fileSize: 0,
    loading: true,
    redirect: false,
  };

  componentDidMount() {
    this.postData = new FormData();
    this.setState({ user: getJwt().user, loading: false });
  }

  handleChange = (name) => (event) => {
    const value =
      name === "photo" && event.target.files.length > 0
        ? event.target.files[0]
        : event.target.value;
    const fileSize =
      name === "photo" && event.target.files.length > 0
        ? event.target.files[0].size
        : 0;
    this.postData.set(name, value);
    this.setState({ [name]: value, fileSize });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.isValid()) {
      const jwt = getJwt();
      createPost(jwt.user._id, jwt.token, this.postData).then((data) => {
        if (data.error) this.setState({ error: data.error });
        else {
          this.setState({
            redirect: true,
          });
        }
      });
    }
  };

  isValid = () => {
    const { title, body, fileSize } = this.state;
    if (fileSize > 100000) {
      this.setState({ error: "File size should be less than 100 KB." });
      return false;
    }
    if (title.length === 0 || body.length === 0) {
      this.setState({ error: "All fields are required." });
      return false;
    }
    return true;
  };

  newPostForm = (title, body) => (
    <form>
      {/* Image */}
      <div className="form-group">
        <label className="text-muted">Post Photo</label>
        <input
          onChange={this.handleChange("photo")}
          type="file"
          accept="image/*"
          className="form-control"
        />
      </div>
      {/* Title */}
      <div className="form-group">
        <label className="text-muted">Title</label>
        <input
          className="form-control"
          type="text"
          onChange={this.handleChange("title")}
          value={title}
        />
      </div>

      {/* Body */}
      <div className="form-group">
        <label className="text-muted">Body</label>
        <textarea
          className="form-control"
          value={body}
          type="text"
          style={{ height: "150px" }}
          onChange={this.handleChange("body")}
        />
      </div>

      {/* Submit Button */}
      <button
        onClick={this.handleSubmit}
        className="btn btn-raised btn-primary mt-3 mb-3"
      >
        Create Post
      </button>
    </form>
  );

  render() {
    const { title, body, photo, error, user, loading, redirect } = this.state;
    if (redirect) {
      return <Redirect to={`/user/${user._id}`} />;
    }

    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Create a New Post</h2>
        <hr />
        <br />
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>
        {loading ? (
          <div className="jumbotron text-center">
            <h2>Loading...</h2>
          </div>
        ) : (
          <div>{this.newPostForm(title, body)}</div>
        )}
      </div>
    );
  }
}

export default NewPost;
