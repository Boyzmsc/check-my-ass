import React, {useEffect, useState, useCallback} from "react";
import {firestore} from "../../services/firebase";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import {FaRegFolder, FaRegClock} from "react-icons/fa";

import Header from "./Header";
import BtnTimer from "./BtnTimer";
import DeleteTaskBtn from "./Action/Delete";
import "./Task.scss";

const moment = require("moment");

function Assignment(props) {
  const [startDate, setStartDate] = useState(
    new Date(initDate(new Date()) + "00:00:00").getTime(),
  );
  const [endDate, setEndDate] = useState(
    new Date(
      initDate(new Date().setMonth(new Date().getMonth() + 3)) + "23:59:59",
    ).getTime(),
  );

  const [taskData, setAssData] = useState([]);
  const [lecData, setLecData] = useState([]);
  const [lecAllData, setAllLecData] = useState([]);
  const [sortSeq, setSortSeq] = useState("asc");
  const [sortLec, setSortLec] = useState("ALL");
  const [flag, setFlag] = useState(true);
  const userId = props.userId;

  function initDate(date) {
    return moment(date).format("YYYY-MM-DDT");
  }

  // Fetch data & Listen sort
  const fetchData = useCallback(() => {
    setAssData([]);
    let taskList = [];
    let lecList = ["ALL"];
    let lecAllList = [];

    firestore
      .collection("users")
      .doc(userId)
      .collection("lec")
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          lecAllList.push({
            "lec-name": doc.data()["lec_name"],
            "prof-name": doc.data()["prof_name"],
            id: doc.id,
          });
        });

        setAllLecData(lecAllList);
      });

    firestore
      .collection("users")
      .doc(userId)
      .collection("task")
      .where("flag", ">=", startDate)
      .where("flag", "<=", endDate)
      .orderBy("flag", sortSeq)
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          taskList.push({
            status: doc.data()["status"],
            "task-name": doc.data()["task_name"],
            "lec-name": doc.data()["lec_name"],
            "due-date": new Date(doc.data()["due_date"]),
            flag: doc.data()["flag"],
            id: doc.id,
          });

          lecList.push(doc.data()["lec_name"]);
        });

        setAssData(taskList);
        const set = new Set(lecList);
        setLecData([...set]);
      });
  }, [sortSeq, sortLec, startDate, endDate, flag]);

  useEffect(() => {
    fetchData();
  }, [sortSeq, sortLec, startDate, endDate, flag]);

  function getDateFormat(date) {
    return moment(date).format("YYYY-MM-DD HH:mm");
  }

  const cards = [];
  for (let i = 0; i < taskData.length; i++) {
    let task = taskData[i];
    if (sortLec !== "ALL") {
      if (task["lec-name"] !== sortLec) {
        continue;
      }
    }
    cards.push(
      <div className="col">
        <div className="card border-dark">
          <div className="card-body">
            <OverlayTrigger
              className="card-title-tooltip"
              placement="top"
              delay={{show: 300, hide: 400}}
              overlay={
                <Tooltip id="button-tooltip">{task["task-name"]}</Tooltip>
              }
            >
              <span
                className="card-title task-name"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title={task["task-name"]}
              >
                {task["task-name"]}
              </span>
            </OverlayTrigger>
            <DeleteTaskBtn
              data={task}
              userId={userId}
              onFlag={() => setFlag(!flag)}
            />
            <p className="card-text lec-name">
              <FaRegFolder className="lec-name-icon" />
              {task["lec-name"]}
            </p>
            <p className="card-text lec-date">
              <FaRegClock className="lec-date-icon" />
              {getDateFormat(task["due-date"])}
            </p>
            <BtnTimer task={task} userId={userId} />
          </div>
        </div>
      </div>,
    );
  }

  return (
    <div className="task">
      <Header
        lecAllData={lecAllData}
        lecData={lecData}
        userId={userId}
        onSort={function (order, lec) {
          if (order) {
            setSortSeq("asc");
          } else {
            setSortSeq("desc");
          }
          setSortLec(lec);
        }.bind(this)}
        onBound={function (start, end) {
          setStartDate(start);
          setEndDate(end);
        }.bind(this)}
      />
      <hr className="hr-nav" />
      <div className="card-group">
        <div className="row row-cols-auto g-2">{cards}</div>
      </div>
    </div>
  );
}

export default Assignment;
