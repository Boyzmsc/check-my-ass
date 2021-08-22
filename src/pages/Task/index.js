import React from "react";

import Header from "./header";
import TaskTable from "./tasktable"
import "./task.scss"

const Task = () => {
  return (
    <div className="task">
      <Header />
      <hr className="hr-nav" />
      <div className = "container-table">
        <div className="table-responsive-xxl">
          <table class="task-table table align-middle table-bordered">
            <thead class="table-light">
              <tr>
                <td>Title</td>
                <td>Content</td>
                <td>Last Update</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              <TaskTable />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Task;
