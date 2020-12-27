import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { getJwt } from "../auth";
import { getPost, updatePost } from "./apiPost";

class EditPost extends Component {
  state = {
    title: "",
    body: "",
    photo: "",
    error: "",
    loading: true,
    fileSize: 0,
    postId: "",
    redirect: false,
  };

  componentDidMount() {
    this.postData = new FormData();
    const postId = this.props.match.params.postId;
    this.setState({ postId });
    getPost(postId).then((data) => {
      if (data.error) this.setState({ error: data.error });
      else {
        this.setState({
          title: data.title,
          body: data.body,
          photo: data.photo,
        });

        this.setState({ loading: false });
      }
    });
  }

  handleChange = (name) => (event) => {
    this.setState({ error: "" });
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
      updatePost(this.state.postId, jwt.token, this.postData).then((data) => {
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
    const { fileSize, title, body } = this.state;
    if (fileSize > 1000000) {
      this.setState({ error: "File size should be less than 1 MB." });
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
        Update Post
      </button>
    </form>
  );

  render() {
    const { title, body, error, loading, postId, redirect } = this.state;
    if (redirect) {
      return <Redirect to={`/post/${postId}`} />;
    }

    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Update Post</h2>
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

export default EditPost;
