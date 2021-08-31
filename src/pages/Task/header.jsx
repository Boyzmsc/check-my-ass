import React, {useState, useEffect} from "react";
import {FaRegArrowAltCircleUp, FaRegArrowAltCircleDown} from "react-icons/fa";

import NewTaskBtn from "./Action/Add";
import "./Header.scss";

const Header = (props) => {
  const [sortSeq, setSortSeq] = useState(true);
  const [sortIcon, setSortIcon] = useState();
  const userId = props.userId;

  useEffect(() => {
    if (sortSeq) {
      setSortIcon(<FaRegArrowAltCircleUp />);
    } else {
      setSortIcon(<FaRegArrowAltCircleDown />);
    }
    props.onSort(sortSeq);
  }, [sortSeq]);

  return (
    <nav class="task-navbar navbar navbar-expand-lg">
      <div className="container-fluid align-items-center">
        <NewTaskBtn userId={userId} />
        <ul class="nav nav-pills">
          <li class="nav-item dropdown">
            <div class="btn-group">
              <button
                type="button"
                class="btn-sort btn btn-outline-dark"
                onClick={function () {
                  setSortSeq(!sortSeq);
                }.bind(this)}
              >
                {sortIcon}
              </button>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
