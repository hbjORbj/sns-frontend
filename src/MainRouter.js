import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./global/Home";
import Navigation from "./global/Navigation";
import NewPost from "./post/NewPost";
import EditProfile from "./user/EditProfile";
import Login from "./user/Login";
import Profile from "./user/Profile";
import Signup from "./user/Signup";
import Users from "./user/Users";
import PrivateRoute from "./auth/PrivateRoute";
import FindPeople from "./user/FindPeople";
import SinglePost from "./post/SinglePost";
import EditPost from "./post/EditPost";

export const MainRouter = () => (
  <div>
    <Navigation />
    <Switch>
      {/* Global */}
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/signup" component={Signup}></Route>
      <Route exact path="/login" component={Login}></Route>
      <PrivateRoute exact path="/findpeople" component={FindPeople} />

      {/* User */}
      <Route exact path="/users" component={Users}></Route>
      <PrivateRoute exact path="/user/:userId" component={Profile} />
      <PrivateRoute exact path="/user/edit/:userId" component={EditProfile} />

      {/* Post */}
      <Route exact path="/post/:postId" component={SinglePost} />
      <PrivateRoute exact path="/post/new/:userId" component={NewPost} />
      <PrivateRoute exact path="/post/edit/:postId" component={EditPost} />
    </Switch>
  </div>
);
