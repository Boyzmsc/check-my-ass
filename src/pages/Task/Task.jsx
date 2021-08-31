import React, {useEffect, useState, useCallback} from "react";
import {firestore} from "../../services/firebase";

import Header from "./Header";
import TaskTable from "./TaskTable";
import "./Task.scss";

const Task = (props) => {
  const userId = props.userId;

  const [sortSeq, setSortSeq] = useState("asc");
  const [taskTable, setTaskTable] = useState(
    <TaskTable userId={userId} sortSeq={sortSeq} />,
  );

  const fetchData = useCallback(() => {
    setTaskTable(<TaskTable userId={userId} sortSeq={sortSeq} />);
  }, [sortSeq]);

  useEffect(() => {
    fetchData();
  }, [sortSeq]);

  return (
    <div className="task">
      <Header
        userId={userId}
        onSort={function (order) {
          if (order) {
            setSortSeq("asc");
          } else {
            setSortSeq("desc");
          }
        }.bind(this)}
      />

      <hr className="hr-nav" />
      <div className="container-table">
        <div className="table-responsive-xxl">
          <table class="task-table table align-middle table-bordered">
            <thead class="table-light">
              <tr>
                <td>Title</td>
                <td>Content</td>
                <td>Last Update</td>
                <td>Action</td>
                <td>Read</td>
              </tr>
            </thead>
            <tbody>{taskTable}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Task;
