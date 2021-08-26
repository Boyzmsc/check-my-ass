import React, {Component} from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {AuthProvider} from "../../components/Login/Context/AuthContext";
import {firestore} from "../../services/firebase";

import DashboardPage from "../Dashboard";
import AssignmentPage from "../Assignment";
import TaskPage from "../Task";
import CalendarPage from "../Calendar";
import InfoPage from "../Info";

class Main extends Component {
  render() {
    return (
      <div className="main">
        <Router>
          <Switch>
            <AuthProvider>
              <Route exact path="/" component={DashboardPage} />
              <Route path="/dashboard" component={DashboardPage} />
              <Route path="/assignment" component={AssignmentPage} />
              <Route path="/task" component={TaskPage} />
              <Route path="/calendar" component={CalendarPage} />
              <Route path="/info" component={InfoPage} />
            </AuthProvider>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default Main;
