import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Home } from "./global/Home";
import { Signup } from "./user/Signup";

export const MainRouter = () => (
  <div>
    <Switch>
      <Route exact path="/signup" component={Signup}></Route>
      <Route exact path="/" component={Home}></Route>
    </Switch>
  </div>
);
