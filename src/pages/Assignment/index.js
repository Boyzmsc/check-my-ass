import React from "react";
import {useAuth} from "../../components/Login/Context/AuthContext";

import MainHeader from "../Common/MainHeader";
import MainFooter from "../Common/MainFooter";
import SideBar from "../../components/SideBar";

import "../Common/Main.scss";
import Assignment from "./Assignment";

function AssignmentPage(props) {
  const {currentUser} = useAuth();
  const userId = currentUser.uid;
  
  return (
    <div className="wrapper">
      <SideBar className="sidebar" />
      <div className="main-panel overflow-auto">
        <header className="main-header">
          <MainHeader />
        </header>
        <Assignment userId={userId} />
        <footer className="main-footer">
          <MainFooter />
        </footer>
      </div>
    </div>
  );
}

export default AssignmentPage;
