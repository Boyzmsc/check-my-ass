import React, {useEffect, useState, useCallback} from "react";
import {firestore} from "../../services/firebase";

import LecPieChart from "./LecChart";
import AssPieChart from "./AssChart";
import AssCalendar from "./AssCalendar";
import "./dashboard.scss";

const moment = require("moment");

const Dashboard = (props) => {
  const [assData, setAssData] = useState([]);
  const userId = props.userId;

  ///////////////////////////////////////////////////////////////
  // Fetch data & Listen sort
  ///////////////////////////////////////////////////////////////
  const fetchData = useCallback(() => {
    setAssData([]);
    let assList = [];

    firestore
      .collection("users")
      .doc(userId)
      .collection("ass")
      .orderBy("lec_name")
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          assList.push({
            status: doc.data()["status"],
            "ass-name": doc.data()["ass_name"],
            "lec-name": doc.data()["lec_name"],
            "due-date": new Date(doc.data()["due_date"]),
            "ass-link": doc.data()["ass_link"],
            flag: doc.data()["flag"],
            id: doc.id,
          });
        });
      })
      .then(() => {
        firestore
          .collection("users")
          .doc(userId)
          .collection("task")
          .orderBy("lec_name")
          .get()
          .then((docs) => {
            docs.forEach((doc) => {
              assList.push({
                status: doc.data()["status"],
                "ass-name": doc.data()["task_name"],
                "lec-name": doc.data()["lec_name"],
                "due-date": new Date(doc.data()["due_date"]),
                "ass-link": "",
                flag: doc.data()["flag"],
                id: doc.id,
              });
            });

            setAssData(assList);
          });
      });
  }, []);
  ///////////////////////////////////////////////////////////////

  useEffect(() => {
    fetchData();
  }, []);

  ///////////////////////////////////////////////////////////////
  // Count completed ass
  ///////////////////////////////////////////////////////////////
  let cntDone = 0;
  let cntMiss = 0;
  for (var i = 0; i < assData.length; i++) {
    const ass = assData[i];
    if (ass["status"] === "Done") {
      cntDone += 1;
    } else if (ass["status"] === "TimeOut") {
      cntMiss += 1;
    }
  }

  let checkAss = [
    {
      id: "Left",
      label: "Left",
      value: assData.length - cntDone - cntMiss,
    },
    {
      id: "Miss",
      label: "Miss",
      value: cntMiss,
    },
    {
      id: "Done",
      label: "Done",
      value: cntDone,
    },
  ];
  ///////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////
  // Filter ass with lec
  ///////////////////////////////////////////////////////////////
  let lecName = [];
  let cntAss = [];
  for (var i = 0; i < assData.length; i++) {
    let ass = assData[i];
    if (
      lecName.indexOf(ass["lec-name"]) === -1 &&
      ass["status"] === "Progress"
    ) {
      lecName.push(ass["lec-name"]);
      cntAss.push(1);
    } else if (
      lecName.indexOf(ass["lec-name"]) !== -1 &&
      ass["status"] === "Progress"
    ) {
      cntAss[lecName.indexOf(ass["lec-name"])] += 1;
    }
  }

  let checkLec = [];
  for (var i = 0; i < lecName.length; i++) {
    let obj = {};
    obj["id"] = lecName[i];
    obj["label"] = lecName[i];
    obj["value"] = cntAss[i];
    checkLec.push(obj);
  }
  ///////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////
  // Count ass with date
  ///////////////////////////////////////////////////////////////
  function getDateFormat(date) {
    return moment(date).format("YYYY-MM-DD");
  }

  let assDate = [];
  let cntDate = [];
  for (var i = 0; i < assData.length; i++) {
    let ass = assData[i];
    let date = getDateFormat(ass["due-date"]);
    if (assDate.indexOf(date) === -1 && ass["status"] === "Progress") {
      assDate.push(date);
      cntDate.push(1);
    } else if (assDate.indexOf(date) !== -1 && ass["status"] === "Progress") {
      cntDate[assDate.indexOf(date)] += 1;
    }
  }

  let checkDate = [];
  for (var i = 0; i < assDate.length; i++) {
    let obj = {};
    obj["day"] = assDate[i];
    obj["value"] = cntDate[i];
    checkDate.push(obj);
  }
  ///////////////////////////////////////////////////////////////

  return (
    <div className="dashboard">
      <div class="card-group">
        <div class="ass-chart-card card">
          <div class="card-body">
            <h5 class="card-title">Assignment Statistics</h5>
            <hr />
          </div>
          <AssPieChart data={checkAss} />
        </div>
        <div class="lec-chart-card card">
          <div class="card-body">
            <h5 class="card-title">Lecture Statistics</h5>
            <hr />
          </div>
          <LecPieChart data={checkLec} />
        </div>
      </div>
      <div class="ass-calendar-card card">
        <div class="card-body">
          <h5 class="card-title">Assignment Contributions</h5>
          <hr />
        </div>
        <AssCalendar class="ass-calendar" data={checkDate} />
      </div>
    </div>
  );
};

export default Dashboard;
