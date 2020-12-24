import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./global/Home";
import Navigation from "./global/Navigation";
import Login from "./user/Login";
import Profile from "./user/Profile";
import Signup from "./user/Signup";
import Users from "./user/Users";

export const MainRouter = () => (
  <div>
    <Navigation />
    <Switch>
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/users" component={Users}></Route>
      <Route exact path="/signup" component={Signup}></Route>
      <Route exact path="/login" component={Login}></Route>
      <Route exact path="/user/:userId" component={Profile}></Route>
    </Switch>
  </div>
);
