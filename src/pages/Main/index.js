import React, { Component } from "react";

import Header from "./Header";
import Footer from "./Footer";
import SideBar from "../../components/SideBar";

import "./main.scss"

import Dashboard from "../Dashboard";
// import Assignment from "../Assignment";
// import Task from "../Task";
// import Calendar from "../Calendar";

class Main extends Component {
  render() {
    return (
      <div className="wrapper">
        <SideBar />
        <div className="main-panel">
          <header className = "header">
            <Header />
          </header>
          <Dashboard />
          {/* 
          <Assignment />
          <Task />
          <Calendar /> */}
          
          <footer className = "footer">
            <Footer />
          </footer>
        </div>
      </div>
    );
  }
}

export default Main;
