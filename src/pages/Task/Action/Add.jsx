import React, {useState, useEffect} from "react";
import {firestore} from "../../../services/firebase";
import {Form} from "react-bootstrap";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./Add.scss";

const moment = require("moment");

const NewTaskBtn = (props) => {
  const [dueDate, setDueDate] = useState(new Date());
  const userId = props.userId;

  ///////////////////////////////////////////////////////
  // Fetch all lecture data
  ///////////////////////////////////////////////////////
  const lecList = props.lecAllData;
  const lecItems = [];
  for (var i = 0; i < Object.keys(lecList).length; i++) {
    var key = Object.keys(lecList)[i];
    lecItems.push(key);
  }
  ///////////////////////////////////////////////////////

  function initDate(date) {
    return moment(date).format("YYYY-MM-DDT");
  }

  function storeTask(assName, lecName) {
    firestore
      .collection("users")
      .doc(userId)
      .collection("task")
      .add({
        status: "Progress",
        task_name: assName,
        lec_name: lecName,
        due_date: initDate(dueDate) + "23:59",
        flag: new Date(initDate(dueDate) + "23:59").getTime(),
      })
      .then(() => {
        window.location.reload();
      });
  }

  const CustomInput = ({value, onClick}) => (
    <button
      type="button"
      className="date-btn btn btn-outline-dark"
      onClick={onClick}
    >
      {value}
    </button>
  );

  return (
    <>
      <button
        type="button"
        class="btn-new-task btn btn-outline-dark"
        data-bs-toggle="modal"
        data-bs-target="#new-task-modal"
      >
        New
      </button>

      <div
        class="modal fade"
        id="new-task-modal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div class="modal-content">
            <form
              method="post"
              onSubmit={function (e) {
                e.preventDefault();
                storeTask(e.target.ass.value, e.target.lec.value);
              }.bind(this)}
            >
              <div class="modal-header">
                <h5 class="modal-ass">New Assignment</h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div class="modal-body">
                <div class="mb-3">
                  <label for="new-task-date" class="col-form-label">
                    Due Date
                  </label>
                  <DatePicker
                    name="date"
                    selected={dueDate}
                    onChange={function (date) {
                      setDueDate(date);
                    }.bind(this)}
                    customInput={<CustomInput />}
                  />
                </div>
                <div class="mb-3">
                  <label for="new-task-lec" class="col-form-label">
                    Lecture
                  </label>
                  <Form.Select
                    id="new-task-lec"
                    name="lec"
                    class="form-control"
                  >
                    {lecItems.map((lec) => (
                      <option key={lec} value={lec}>
                        {lec}
                      </option>
                    ))}
                  </Form.Select>
                </div>
                <div class="mb-1">
                  <label for="new-task-ass" class="col-form-label">
                    Assignment
                  </label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="new-task-ass"
                    name="ass"
                  />
                </div>
              </div>

              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  class="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewTaskBtn;
