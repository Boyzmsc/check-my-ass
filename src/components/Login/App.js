import React from "react";
import Signup from "./Signup";
import {Container} from "react-bootstrap";
import {AuthProvider} from "./Context/AuthContext";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import PrivateRoute from "./PrivateRoute";
import Main from "../../pages/Main";
import Dashboard from "./Dashboard";

import "./App.scss";

function App() {
  return (
    <Container className="root-body d-flex align-items-center justify-content-center">
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path="/" component={Main} />
            {/* <PrivateRoute exact path="/" component={Dashboard} /> */}
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

export default App;
