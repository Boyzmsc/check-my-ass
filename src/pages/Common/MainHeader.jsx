/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from "react";
import {useAuth} from "../../components/Login/Context/AuthContext";
import {useHistory} from "react-router";

import "./MainHeader.scss";

import {FaSyncAlt, FaSignOutAlt} from "react-icons/fa";

export default function MainHeader() {
  const [error, setError] = useState("");
  const {currentUser, logout} = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <nav class="main-navbar navbar navbar-expand-lg navbar-dark">
      <div class="container-fluid">
        <p></p>
        <ul class="nav nav-pills">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
              href="/"
              role="button"
              aria-expanded="false"
            />
            <ul class="dropdown-menu dropdown-menu-end">
              <li>
                <a class="dropdown-item" href="#">
                  <FaSyncAlt className="sync-icon" />
                  Sync
                </a>
              </li>
              <li>
                <hr class="dropdown-divider" />
              </li>
              <li>
                <a
                  class="dropdown-item"
                  href="javascript:void(0);"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt className="logout-icon" />
                  Log Out
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
}
