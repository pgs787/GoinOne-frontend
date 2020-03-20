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
import Main from "Pages/Main/Main";
import Myassetprofitloss from "Pages/Exchange/Components/Myassetprofitloss";

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/exchange/trade/:coin" component={Index} />
        <Route exact path="/" component={Index} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signupnext" component={Signupnext} />
        <Route exact path="/exchange" component={Index} />
        <Route exact path="/main" component={Main} />
        <Route exact path="/myassetprofitloss" component={Myassetprofitloss} />
        <Redirect to="/error" />
      </Switch>
    </Router>
  );
}

export default Routes;
