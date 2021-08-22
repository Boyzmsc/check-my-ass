import React from "react";

import EditTaskBtn from "./Action/edit";
import DeleteTaskBtn from "./Action/delete";
import CheckTaskBtn from "./Action/check";
import "./tasktable.scss";

const moment = require("moment");

const TaskTable = () => {
  const taskDatas = [
    {
      status: true,
      title: "Title1",
      content: "Content1",
      "last-update": new Date("2021-08-17T23:16"),
    },
    {
      status: false,
      title: "Title2",
      content: "Content3",
      "last-update": new Date("2021-08-23T19:16"),
    },
    {
      status: true,
      title: "Title2",
      content: "Content3",
      "last-update": new Date("2021-08-23T10:08"),
    },
  ];

  function getDateFormat(date) {
    return moment(date).format("YYYY-MM-DD HH:mm");
  }

  const tasks = [];

  for (var i = 0; i < taskDatas.length; i++) {
    var taskData = taskDatas[i];
    console.log(taskData["last-update"]);
    tasks.push(
      <tr className="task-record">
        <td className="task-record-title">{taskData["title"]}</td>
        <td className="task-record-content">{taskData["content"]}</td>
        <td className="task-record-date">
          {getDateFormat(taskData["last-update"])}
        </td>
        <td className="task-record-action">
          <div
            class="task-record-action-btn btn-group"
            role="group"
            aria-label="Basic outlined example"
          >
            <EditTaskBtn />
            <CheckTaskBtn />
            <DeleteTaskBtn />
          </div>
        </td>
      </tr>,
    );
  }

  return <>{tasks}</>;
};

export default TaskTable;
