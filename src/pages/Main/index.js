import React, {Component} from "react";
import {BrowserRouter as Router, Switch} from "react-router-dom";
import PrivateRoute from "../../components/Login/PrivateRoute";
import {AuthProvider} from "../../components/Login/Context/AuthContext";
import {useAuth} from "../../components/Login/Context/AuthContext";

import DashboardPage from "../Dashboard";
import AssignmentPage from "../Assignment";
import TaskPage from "../Task";
import CalendarPage from "../Calendar";
import InfoPage from "../Info";

export default function Main() {
  const {currentUser} = useAuth();

  return (
    <div className="main">
      <Router>
        <Switch>
          <AuthProvider>
            <PrivateRoute
              exact
              path="/"
              component={() => <DashboardPage userId={currentUser.uid} />}
            />
            <PrivateRoute
              path="/dashboard"
              component={() => <DashboardPage userId={currentUser.uid} />}
            />
            <PrivateRoute
              path="/assignment"
              component={() => <AssignmentPage userId={currentUser.uid} />}
            />
            <PrivateRoute
              path="/task"
              component={() => <TaskPage userId={currentUser.uid} />}
            />
            <PrivateRoute
              path="/calendar"
              component={() => <CalendarPage userId={currentUser.uid} />}
            />
            <PrivateRoute
              path="/info"
              component={() => <InfoPage userId={currentUser.uid} />}
            />
          </AuthProvider>
        </Switch>
      </Router>
    </div>
  );
}
