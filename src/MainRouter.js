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

export const MainRouter = () => (
  <div>
    <Navigation />
    <Switch>
      {/* Global */}
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/signup" component={Signup}></Route>
      <Route exact path="/login" component={Login}></Route>

      {/* User */}
      <Route exact path="/users" component={Users}></Route>
      <Route exact path="/user/:userId" component={Profile}></Route>
      <Route exact path="/user/edit/:userId" component={EditProfile}></Route>

      {/* Post */}
      <Route exact path="/post/new" component={NewPost}></Route>
    </Switch>
  </div>
);
