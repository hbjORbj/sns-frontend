import React, { Component } from "react";
import { Link } from "react-router-dom";
import DefaultAvatar from "../images/avatar.jpg";

class ProfileTabs extends Component {
  render() {
    const { following, followers, posts } = this.props;
    return (
      <div>
        <div className="row">
          {/* Followers */}
          <div className="col-md-4">
            <h3 className="text-primary">{followers.length} Followers</h3>
            <hr />
            {followers.map((user, i) => (
              <div key={i}>
                <Link to={`/users/${user._id}`}>
                  <img
                    src={`${process.env.REACT_APP_API_URL}/user/photo/${user.id}`}
                    alt={user.name}
                    onError={(i) => (i.target.src = `${DefaultAvatar}`)}
                    style={{
                      borderRadius: "50%",
                      border: "1px solid black",
                      width: "30px",
                      height: "30px",
                    }}
                    className="float-left mr-3"
                  />
                  <div>
                    <p className="lead">{user.name}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Following */}
          <div className="col-md-4">
            <h3 className="text-primary">{following.length} Following</h3>
            <hr />
            {following.map((user, i) => (
              <div key={i}>
                <Link to={`/users/${user._id}`}>
                  <img
                    src={`${process.env.REACT_APP_API_URL}/user/photo/${user.id}`}
                    alt={user.name}
                    onError={(i) => (i.target.src = `${DefaultAvatar}`)}
                    style={{
                      borderRadius: "50%",
                      border: "1px solid black",
                      width: "30px",
                      height: "30px",
                    }}
                    className="float-left mr-3"
                  />
                  <div>
                    <p className="lead">{user.name}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Posts */}
          <div className="col-md-4">
            <h3 className="text-primary">{posts.length} Posts</h3>
            <hr />
            {posts.map((post, i) => (
              <div key={i}>
                <Link to={`/post/${post._id}`}>
                  <div>
                    <p className="lead">{post.title}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileTabs;
