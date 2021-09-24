import React, {useEffect, useState, useCallback} from "react";
import {firestore} from "../../services/firebase";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import {FaRegFolder, FaRegClock, FaRegFileAlt} from "react-icons/fa";

import Header from "./Header";
import BtnTimer from "./BtnTimer";
import "./Assignment.scss";

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

  const [assData, setAssData] = useState([]);
  const [lecData, setLecData] = useState([]);
  const [sortSeq, setSortSeq] = useState("asc");
  const [sortLec, setSortLec] = useState("ALL");
  const userId = props.userId;

  function initDate(date) {
    return moment(date).format("YYYY-MM-DDT");
  }

  // Fetch data & Listen sort
  const fetchData = useCallback(() => {
    setAssData([]);
    let assList = [];
    let lecList = ["ALL"];

    firestore
      .collection("users")
      .doc(userId)
      .collection("ass")
      .where("flag", ">=", startDate)
      .where("flag", "<=", endDate)
      .orderBy("flag", sortSeq)
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

          lecList.push(doc.data()["lec_name"]);
        });

        setAssData(assList);
        const set = new Set(lecList);
        setLecData([...set]);
      });
  }, [sortSeq, sortLec, startDate, endDate]);

  useEffect(() => {
    fetchData();
  }, [sortSeq, sortLec, startDate, endDate]);

  function getDateFormat(date) {
    return moment(date).format("YYYY-MM-DD HH:mm");
  }

  const cards = [];
  for (let i = 0; i < assData.length; i++) {
    let ass = assData[i];
    if (sortLec !== "ALL") {
      if (ass["lec-name"] !== sortLec) {
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
              overlay={<Tooltip id="button-tooltip">{ass["ass-name"]}</Tooltip>}
            >
              <span
                className="card-title ass-name"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title={ass["ass-name"]}
              >
                {ass["ass-name"]}
              </span>
            </OverlayTrigger>
            <a className="ass-link" href={ass["ass-link"]} target="_blank">
              <FaRegFileAlt className="ass-link-icon" />
            </a>
            <p className="card-text lec-name">
              <FaRegFolder className="lec-name-icon" />
              {ass["lec-name"]}
            </p>
            <p className="card-text lec-date">
              <FaRegClock className="lec-date-icon" />
              {getDateFormat(ass["due-date"])}
            </p>
            <BtnTimer ass={ass} userId={userId} />
          </div>
        </div>
      </div>,
    );
  }

  return (
    <div className="assignment">
      <Header
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
