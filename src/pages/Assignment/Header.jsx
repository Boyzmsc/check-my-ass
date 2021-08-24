import React from "react";

import DatePicker from "./DatePicker";
import "./Header.scss";

const Header = () => {
  return (
    <nav class="ass-navbar navbar navbar-expand-lg">
      <div className="container-fluid align-items-center">
        <DatePicker />
        <ul class="nav nav-pills">
          <li class="nav-item dropdown">
            <div class="btn-group">
              <button type="button" class="btn-sort btn btn-outline-dark">
                Sort
              </button>
              <button
                type="button"
                class="btn-sort btn btn-outline-dark dropdown-toggle dropdown-toggle-split"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span class="visually-hidden">Toggle Dropdown</span>
              </button>
              <ul class="dropdown-menu dropdown-menu-end">
                <li>
                  <a class="dropdown-item" href="">
                    과목명순
                  </a>
                </li>
                <li>
                  <hr class="dropdown-divider" />
                </li>
                <li>
                  <a class="dropdown-item" href="">
                    날짜순 (오름차순)
                  </a>
                </li>
                <li>
                  <hr class="dropdown-divider" />
                </li>
                <li>
                  <a class="dropdown-item" href="">
                    날짜순 (내림차순)
                  </a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
