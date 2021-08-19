/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";

import "./header.scss"

import { FaBars } from "react-icons/fa";

class Header extends Component {
  render() {
    return (
        <nav class="main-navbar navbar navbar-expand-lg navbar-dark">
            <div class="container-fluid">
                <a class = "toggle"><FaBars className = "btn-toggle-icon" style={{color : "#adadad"}}/></a>
                <ul class="nav nav-pills">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="/" role="button" aria-expanded="false" />
                        <ul class="dropdown-menu dropdown-menu-end">
                        <li><a class="dropdown-item" href="#">Sync</a></li>
                        <li><hr class="dropdown-divider" /></li>
                        <li><a class="dropdown-item" href="#">Log Out</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    );
  }
}

export default Header;
