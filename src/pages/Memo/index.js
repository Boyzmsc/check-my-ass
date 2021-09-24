import React from "react";
import {useAuth} from "../../components/Login/Context/AuthContext";

import MainHeader from "../Common/MainHeader";
import MainFooter from "../Common/MainFooter";
import SideBar from "../../components/SideBar";

import "../Common/Main.scss";
import Memo from "./Memo";

function MemoPage(props) {
  const {currentUser} = useAuth();
  const userId = currentUser.uid;

  return (
    <div className="wrapper">
      <SideBar className="sidebar" />
      <div className="main-panel overflow-auto">
        <header className="main-header">
          <MainHeader />
        </header>
        <Memo userId={userId} />
        <footer className="main-footer">
          <MainFooter />
        </footer>
      </div>
    </div>
  );
}

export default MemoPage;
