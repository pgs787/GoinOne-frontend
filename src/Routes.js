import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

// improt 페이지 목록
import Login from "Pages/Login/Login";
import Signup from "Pages/Signup/Signup";
import Signupnext from "Pages/Signup/Signupnext";
import Index from "Pages/Exchange/Index";

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/exchange/trade/:coin/krw" component={Index} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signupnext" component={Signupnext} />
        <Route exact path="/exchange" component={Index} />
        <Redirect to="/error" />
      </Switch>
    </Router>
  );
}

export default Routes;
