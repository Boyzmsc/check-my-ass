import React, { Component } from "react";
import { Route } from 'react-router-dom';

import Header from "./Header";
import Footer from "./Footer";
import SideBar from "../../components/SideBar";

import "./main.scss"

import Dashboard from "../Dashboard";
import Assignment from "../Assignment";
import Task from "../Task";
import Calendar from "../Calendar";

class Main extends Component {
  render() {
    return (
      <div className="wrapper">
        <SideBar className= "sidebar" />
        <div className="main-panel overflow-auto">
          <header className = "header">
            <Header />
          </header>

          <Route path="/dashboard" component={Dashboard} />
          <Route exact path="/assignment" component={Assignment} />
          <Route path="/task" component={Task} />
          <Route path="/calendar" component={Calendar} />

          <footer className = "footer">
            <Footer />
          </footer>
        </div>
      </div>
    );
  }
}

export default Main;
