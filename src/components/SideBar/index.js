/* eslint-disable react/style-prop-object */
import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom';

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
      <>
        <ProSidebar className = "sidebar-main">
          <SidebarHeader className = "sidebar-header">
            <a href = "/dashboard" className = "home-text">Check My Ass</a>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="circle">
              <MenuItem className = "menuitem" icon={<FaTachometerAlt />}>
                <Link to="/dashboard">Dashboard</Link>
              </MenuItem>

              <MenuItem className = "menuitem" icon={<FaGraduationCap />}>
                <Link to="/assignment">Assignment</Link>
              </MenuItem>

              <MenuItem className = "menuitem" icon={<FaRegListAlt />}>
                <Link to="/task">Task</Link>
              </MenuItem>

              <MenuItem className = "menuitem" icon={<FaRegCalendarAlt />}>
                <Link to="/calendar">Calendar</Link>
              </MenuItem>
            </Menu>
          </SidebarContent>
          <SidebarFooter className = "sidebar-footer">
          <a href = "https://ecampus.kookmin.ac.kr/" target = "_blank" className = "univ-text">Kookmin University</a>
          </SidebarFooter>
        </ProSidebar>
      </>
    );
  }
}

export default withRouter(SideBar);
