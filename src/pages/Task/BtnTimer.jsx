import React, {useEffect, useState} from "react";
import {firestore} from "../../services/firebase";
import "./BtnTimer.scss";

function BtnTimer(props) {
  const task = props.task;
  const [date, setDate] = useState("");
  const [status, setStatus] = useState(task["status"]);
  let endDate = task["due-date"];

  function updateStatus(value) {
    firestore
      .collection("users")
      .doc(props.userId)
      .collection("task")
      .doc(task["id"])
      .update({
        status: value,
      })
      .then(() => {
        setStatus(value);
      });
  }

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

        let len =
          diffDay.toString().length >= 2 ? diffDay.toString().length : 2;
        let dayStr = ("0".repeat(len) + diffDay).slice(-len);
        let hourStr = ("00" + diffHour).slice(-2);
        let minuteStr = ("00" + diffMinute).slice(-2);
        let secondStr = ("00" + diffSecond).slice(-2);

        if (diff <= 0 && status === "Progress") {
          updateStatus("TimeOut");
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
        id={task["task-link"]}
        type="button"
        class="btn-task btn btn-outline-dark"
        onClick={function (e) {
          updateStatus("Done");
        }.bind(this)}
      >
        {date}
      </button>
    );
  } else if (status === "TimeOut") {
    return (
      <button
        id={task["task-link"]}
        type="button"
        className="btn-task btn btn-danger disabled"
      >
        TIME OUT
      </button>
    );
  } else if (status === "Done") {
    return (
      <button
        id={task["task-link"]}
        type="button"
        className="btn-task btn btn-success disabled"
      >
        SUCCESS
      </button>
    );
  }
}

export default BtnTimer;
