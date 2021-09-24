import React from "react";
import Signup from "../../components/Login/Signup";
import {Container} from "react-bootstrap";
import {AuthProvider} from "../../components/Login/Context/AuthContext";
import {HashRouter as Router, Switch, Route} from "react-router-dom";

import Login from "../../components/Login/Login";
import ForgotPassword from "../../components/Login/ForgotPassword";
import PrivateRoute from "../../components/Login/PrivateRoute";

import DashboardPage from "../Dashboard";
import AssignmentPage from "../Assignment";
import TaskPage from "../Task";
import MemoPage from "../Memo";
// import AnalysisPage from "../Analysis";

import "./Main.scss";

export default function Main() {
  return (
    <Container className="root-body d-flex align-items-center justify-content-center">
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path="/" component={DashboardPage} />
            <PrivateRoute path="/dashboard" component={DashboardPage} />
            <PrivateRoute path="/assignment" component={AssignmentPage} />
            <PrivateRoute path="/task" component={TaskPage} />
            <PrivateRoute path="/memo" component={MemoPage} />
            {/* <PrivateRoute path="/analysis" component={AnalysisPage} /> */}

            <div className="login-body w-100">
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
            </div>
          </Switch>
        </AuthProvider>
      </Router>
    </Container>
  );
}
