import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./global/Home";
import { Navigation } from "./global/Navigation";
import Login from "./user/Login";
import Signup from "./user/Signup";

export const MainRouter = () => (
  <div>
    <Navigation />
    <Switch>
      <Route exact path="/signup" component={Signup}></Route>
      <Route exact path="/login" component={Login}></Route>
      <Route exact path="/" component={Home}></Route>
    </Switch>
  </div>
);
