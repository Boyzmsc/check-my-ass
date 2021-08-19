/* eslint-disable react/style-prop-object */
import React, { Component } from "react";

import {
  FaTachometerAlt,
  FaRegCalendarAlt,
  FaRegListAlt,
  FaGraduationCap
} from "react-icons/fa";

import {
  ProSidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  Menu,
  MenuItem,
} from "react-pro-sidebar";

import "react-pro-sidebar/dist/css/styles.css";
import "./sidebar.scss"

class SideBar extends Component {
  render() {
    return (
      <div>
        <ProSidebar className = "sidebar-main">
          <SidebarHeader className = "sidebar-header">
            <a href = "./" className = "home-text">Check My Ass</a>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="circle">
              <MenuItem className = "menuitem" icon={<FaTachometerAlt />}>Dashboard</MenuItem>
              <MenuItem className = "menuitem" icon={<FaGraduationCap />}>Assignment</MenuItem>
              <MenuItem className = "menuitem" icon={<FaRegListAlt />}>Task</MenuItem>
              <MenuItem className = "menuitem" icon={<FaRegCalendarAlt />}>Calendar</MenuItem>
            </Menu>
          </SidebarContent>
          <SidebarFooter className = "sidebar-footer">
          <a href = "https://ecampus.kookmin.ac.kr/" target = "_blank" className = "univ-text">Kookmin University</a>
          </SidebarFooter>
        </ProSidebar>
      </div>
    );
  }
}

export default SideBar;
