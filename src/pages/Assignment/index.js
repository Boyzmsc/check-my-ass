import React, {useEffect, useState} from "react";
import {FaRegFolder, FaRegClock, FaRegFileAlt} from "react-icons/fa";

import Header from "./Header";
import "./Assignment.scss";

const moment = require("moment");

function Assignment() {
  const cards = [];
  const asss = [
    {
      status: "Done",
      "ass-name": "UML 만들기 1",
      "lec-name": "모바일프로그래밍",
      "due-date": new Date("2021-08-28T01:28"),
      "ass-link": "https://hianna.tistory.com/2",
    },
    {
      status: "Done",
      "ass-name": "UML 만들기 2",
      "lec-name": "모바일프로그래밍",
      "due-date": new Date("2021-09-02T01:28"),
      "ass-link": "https://hianna.tistory.com/2",
    },
    {
      status: "Progress",
      "ass-name": "UML 만들기 3",
      "lec-name": "모바일프로그래밍",
      "due-date": new Date("2021-09-09T01:28"),
      "ass-link": "https://hianna.tistory.com/2",
    },
    {
      status: "Progress",
      "ass-name": "UML 만들기 4",
      "lec-name": "모바일프로그래밍",
      "due-date": new Date("2021-09-16T01:28"),
      "ass-link": "https://hianna.tistory.com/2",
    },

    {
      status: "TimeOut",
      "ass-name": "Data Transfer 1",
      "lec-name": "빅데이터플랫폼",
      "due-date": new Date("2021-08-23T21:16"),
      "ass-link": "https://hianna.tistory.com/475",
    },
    {
      status: "Progress",
      "ass-name": "Data Transfer 2",
      "lec-name": "빅데이터플랫폼",
      "due-date": new Date("2021-08-30T21:16"),
      "ass-link": "https://hianna.tistory.com/475",
    },
    {
      status: "Progress",
      "ass-name": "Data Transfer 3",
      "lec-name": "빅데이터플랫폼",
      "due-date": new Date("2021-09-15T21:16"),
      "ass-link": "https://hianna.tistory.com/475",
    },

    {
      status: "Done",
      "ass-name": "Intelligence Commute 1",
      "lec-name": "인공지능",
      "due-date": new Date("2021-08-29T21:16"),
      "ass-link": "https://hianna.tistory.com/469",
    },
    {
      status: "Done",
      "ass-name": "Intelligence Commute 2",
      "lec-name": "인공지능",
      "due-date": new Date("2021-08-31T21:16"),
      "ass-link": "https://hianna.tistory.com/469",
    },
    {
      status: "Progress",
      "ass-name": "Intelligence Commute 3",
      "lec-name": "인공지능",
      "due-date": new Date("2021-09-23T21:16"),
      "ass-link": "https://hianna.tistory.com/469",
    },
    {
      status: "Progress",
      "ass-name": "Intelligence Commute 4",
      "lec-name": "인공지능",
      "due-date": new Date("2021-09-30T21:16"),
      "ass-link": "https://hianna.tistory.com/469",
    },

    {
      status: "Progress",
      "ass-name": "Chapter 14 : Question",
      "lec-name": "컴퓨터네트워크",
      "due-date": new Date("2021-09-05T21:16"),
      "ass-link": "https://hianna.tistory.com/409",
    },
    {
      status: "Progress",
      "ass-name": "Chapter 14 : Problem",
      "lec-name": "컴퓨터네트워크",
      "due-date": new Date("2021-09-05T21:16"),
      "ass-link": "https://hianna.tistory.com/409",
    },

    {
      status: "Done",
      "ass-name": "Brute Force 1",
      "lec-name": "알고리즘",
      "due-date": new Date("2021-09-07T17:41"),
      "ass-link": "https://hianna.tistory.com/39",
    },
    {
      status: "Progress",
      "ass-name": "Brute Force 2",
      "lec-name": "알고리즘",
      "due-date": new Date("2021-09-17T17:41"),
      "ass-link": "https://hianna.tistory.com/39",
    },
    {
      status: "Progress",
      "ass-name": "Brute Force 3",
      "lec-name": "알고리즘",
      "due-date": new Date("2021-09-27T17:41"),
      "ass-link": "https://hianna.tistory.com/39",
    },
  ];

  
  function BtnTimer(ass) {
    const [date, setDate] = useState("");
    const [status, setStatus] = useState(ass["status"]);

    let endDate = ass["due-date"];

    useEffect(() => {
      if (status === "Done" || status === "TimeOut") {
        return () => clearInterval(countdown);
      } else {
        var countdown = setInterval(() => {
          let stDate = new Date();

          let diff = endDate.getTime() - stDate.getTime();
          let diffDay = Math.floor(diff / (1000 * 60 * 60 * 24));
          let diffHour = Math.floor(
            (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          );
          let diffMinute = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          let diffSecond = Math.floor((diff % (1000 * 60)) / 1000);

          let dayStr = ("00" + diffDay).slice(-2);
          let hourStr = ("00" + diffHour).slice(-2);
          let minuteStr = ("00" + diffMinute).slice(-2);
          let secondStr = ("00" + diffSecond).slice(-2);

          if (diff <= 0 && status === "Progress") {
            setStatus("TimeOut");
            clearInterval(countdown);
          } else if (diff > 0 && status === "Progress") {
            setDate(dayStr + ":" + hourStr + ":" + minuteStr + ":" + secondStr);
          } else {
            clearInterval(countdown);
          }
        }, 1000);
        return () => clearInterval(countdown);
      }
    }, [date, status]);

    if (status === "Progress") {
      return (
        <button
          id={ass["ass-link"]}
          type="button"
          class="btn-ass btn btn-outline-dark"
          onClick={function (e) {
            setStatus("Done");
            // 외부 객체 status 값도 변경해야함
          }.bind(this)}
        >
          {date}
        </button>
      );
    } else if (status === "TimeOut") {
      return (
        <button
          id={ass["ass-link"]}
          type="button"
          className="btn-ass btn btn-danger disabled"
        >
          TIME OUT
        </button>
      );
    } else if (status === "Done") {
      return (
        <button
          id={ass["ass-link"]}
          type="button"
          className="btn-ass btn btn-success disabled"
        >
          SUCCESS
        </button>
      );
    }
  }

  function getDateFormat(date) {
    return moment(date).format("YYYY-MM-DD HH:mm");
  }

  for (let i = 0; i < asss.length; i++) {
    let ass = asss[i];
    cards.push(
      <div className="col">
        <div className="card border-dark">
          <div className="card-body">
            <span className="card-title ass-name">{ass["ass-name"]}</span>
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
            {BtnTimer(ass)}
          </div>
        </div>
      </div>,
    );
  }

  return (
    <div className="assignment">
      <Header />
      <hr className="hr-nav" />
      <div className="card-group">
        <div className="row row-cols-auto g-2">{cards}</div>
      </div>
    </div>
  );
}

export default Assignment;
