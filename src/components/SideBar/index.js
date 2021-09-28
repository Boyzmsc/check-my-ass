/* eslint-disable react/style-prop-object */
import React from "react";
import {Link} from "react-router-dom";

import {
  FaTachometerAlt,
  FaRegListAlt,
  FaGraduationCap,
  FaChartLine,
  FaComments,
  FaInfoCircle,
} from "react-icons/fa";

import {BiNote} from "react-icons/bi";

import {
  ProSidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  Menu,
  MenuItem,
} from "react-pro-sidebar";

import "react-pro-sidebar/dist/css/styles.css";
import "./sidebar.scss";

export default function SideBar() {
  return (
    <>
      <ProSidebar className="sidebar-main">
        <SidebarHeader className="sidebar-header">
          <Link to="/dashboard" className="home-text">
            Check My Ass
          </Link>
        </SidebarHeader>
        <SidebarContent className="sidebar-content">
          <Menu iconShape="circle">
            <MenuItem className="menuitem" icon={<FaTachometerAlt />}>
              <Link to="/dashboard">Dashboard</Link>
            </MenuItem>

            <MenuItem className="menuitem" icon={<FaGraduationCap />}>
              <Link to="/assignment">Assignment</Link>
            </MenuItem>

            <MenuItem className="menuitem" icon={<FaRegListAlt />}>
              <Link to="/task">Task</Link>
            </MenuItem>

            <MenuItem className="menuitem" icon={<FaComments />}>
              <Link to="/memo">Memo</Link>
            </MenuItem>

            {/* <MenuItem className="menuitem" icon={<FaChartLine />}>
              <Link to="/analysis">Analysis</Link>
            </MenuItem> */}
          </Menu>
        </SidebarContent>
        <SidebarFooter className="sidebar-footer">
          <a
            href="https://ecampus.kookmin.ac.kr/"
            target="_blank"
            className="univ-text"
          >
            Kookmin University
          </a>
        </SidebarFooter>
      </ProSidebar>
    </>
  );
}
