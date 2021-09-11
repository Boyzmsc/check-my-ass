import React, {useState, useEffect} from "react";
import {FaRegArrowAltCircleUp, FaRegArrowAltCircleDown} from "react-icons/fa";

import DatePicker from "./DatePicker";
import NewTaskBtn from "./Action/Add";
import "./Header.scss";

const Header = (props) => {
  // const [sortSeq, setSortSeq] = useState("asc");
  const [sortSeq, setSortSeq] = useState(true);
  const [sortIcon, setSortIcon] = useState();
  const [sortLec, setSortLec] = useState("ALL");
  const userId = props.userId;
  const lecAllData = props.lecAllData;

  useEffect(() => {
    if (sortSeq) {
      setSortIcon(<FaRegArrowAltCircleUp />);
    } else {
      setSortIcon(<FaRegArrowAltCircleDown />);
    }
    props.onSort(sortSeq, sortLec);
  }, [sortSeq, sortLec]);

  let lecList = Object.create(null);
  for (var i = 0; i < lecAllData.length; i++) {
    let lecName = lecAllData[i]["lec-name"];
    lecList[lecName] = lecName;
  }

  let dropDownMenus = [];
  for (var i = 0; i < props.lecData.length; i++) {
    let lec = props.lecData[i];
    dropDownMenus.push(
      <>
        <li>
          <a
            class="dropdown-item"
            href="javascript:void(0);"
            onClick={function () {
              setSortLec(lec);
            }}
          >
            {lec}
          </a>
        </li>
      </>,
    );

    if (i < props.lecData.length - 1) {
      dropDownMenus.push(
        <>
          <li>
            <hr class="dropdown-divider" />
          </li>
        </>,
      );
    }
  }

  return (
    <nav class="task-navbar navbar navbar-expand-lg">
      <div className="container-fluid align-items-center">
        <DatePicker
          onBound={function (start, end) {
            props.onBound(start, end);
          }}
        />
        <ul class="nav nav-pills">
          <li class="nav-item dropdown">
            <div class="btn-group">
              <NewTaskBtn lecAllData={lecList} userId={userId} />
              <button
                type="button"
                class="btn-sort btn btn-outline-dark"
                onClick={function () {
                  setSortSeq(!sortSeq);
                }}
              >
                {sortIcon}
              </button>
              <button
                type="button"
                class="btn-sort btn btn-outline-dark dropdown-toggle dropdown-toggle-split"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span class="visually-hidden">Toggle Dropdown</span>
              </button>
              <ul class="dropdown-menu dropdown-menu-end">{dropDownMenus}</ul>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
