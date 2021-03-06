import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getJwt, isUserLoggedIn } from "../auth";
import { readUser } from "./apiUser";
import DeleteUser from "./DeleteUser";
import DefaultAvatar from "../images/avatar.jpg";
import FollowButton from "./FollowButton";
import ProfileTabs from "./ProfileTabs";
import { getPostsByUser } from "../post/apiPost";

class Profile extends Component {
  state = {
    _id: "",
    name: "",
    email: "",
    created: "",
    photo: "",
    following: [],
    followers: [],
    posts: [],
    amIFollowing: false,
    about: "",
    loading: true,
  };

  checkFollow = () => {
    const { followers } = this.state;
    let match = followers.find(
      (follower) => follower._id === getJwt().user._id
    );
    return match !== undefined;
  };

  handleFollowButton = (api) => {
    const jwt = getJwt();
    api(jwt.user._id, this.state._id, jwt.token).then((data) => {
      if (data.error) this.setState({ error: data.error });
      else {
        this.setState({
          amIFollowing: !this.state.amIFollowing,
          followers: data.followers,
          following: data.following,
        });
      }
    });
  };

  loadPosts = (userId) => {
    const token = getJwt().token;
    getPostsByUser(userId, token).then((data) => {
      if (data.error) this.setState({ error: data.error });
      else {
        this.setState({ posts: data });
      }
    });
  };

  init(userId) {
    const token = isUserLoggedIn() ? getJwt().token : null;
    readUser(userId, token).then((data) => {
      if (data.error) this.setState({ error: data.error });
      else {
        this.setState({
          _id: data._id,
          name: data.name,
          email: data.email,
          created: data.created,
          following: data.following,
          followers: data.followers,
          about: data.about,
          photo: data.photo,
          loading: false,
        });
        this.setState({ amIFollowing: this.checkFollow() });
      }
    });
  }

  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.loadPosts(userId);
    this.init(userId);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      this.setState({ loading: true });
      const userId = this.props.match.params.userId;
      this.init(userId);
    }
  }

  render() {
    const {
      _id,
      name,
      email,
      created,
      about,
      loading,
      posts,
      photo,
      amIFollowing,
      following,
      followers,
    } = this.state;
    const photoUrl = photo
      ? `${process.env.REACT_APP_API_URL}/user/photo/${_id}`
      : DefaultAvatar;
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Profile</h2>
        <hr />
        <br />

        {loading ? (
          <div className="jumbotron">
            <h2 className="text-center">Loading...</h2>
          </div>
        ) : (
          <div>
            <div className="row">
              <div className="col-md-4">
                <img
                  className="img-thumbnail"
                  alt={`${name}'s Profile Image`}
                  style={{ width: "auto", height: "250px" }}
                  src={photoUrl}
                />
              </div>
              <div className="col-md-8">
                <div className="lead mt-3">
                  <p>Hello, {name}</p>
                  <p>Email: {email}</p>
                  <p>{`Joined on ${new Date(created).toDateString()}`}</p>
                </div>

                {isUserLoggedIn() &&
                getJwt().user &&
                getJwt().user._id === _id ? (
                  <div className="mt-5 mb-5">
                    <Link
                      className="btn btn-raised btn-info mr-5"
                      to={`/post/new/${_id}`}
                      style={{ width: "170px" }}
                    >
                      Create Post
                    </Link>
                    <Link
                      className="btn btn-raised btn-success mr-5"
                      to={`/user/edit/${_id}`}
                      style={{ width: "170px" }}
                    >
                      Edit Profile
                    </Link>
                    <DeleteUser userId={_id} />
                  </div>
                ) : (
                  <div className="mt-5 mb-5">
                    <FollowButton
                      amIFollowing={amIFollowing}
                      onButtonClick={this.handleFollowButton}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <hr />
                <p className="lead">{about}</p>
                <hr />
              </div>
            </div>
            <ProfileTabs
              followers={followers}
              following={following}
              posts={posts}
            />
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
