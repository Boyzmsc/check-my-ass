import React, {useState, useEffect} from "react";
import {firestore} from "../../../services/firebase";
import {FaRegTrashAlt} from "react-icons/fa";

import "./Delete.scss";

const DeleteTaskBtn = (props) => {
  const [taskData, setTaskData] = useState(props.data);

  function deleteTask() {
    console.log(taskData);
    firestore
      .collection("users")
      .doc(props.userId)
      .collection("task")
      .doc(taskData.id)
      .delete()
      .then(() => {
        props.onFlag();
      });
  }

  return (
    <>
      <FaRegTrashAlt
        type="button"
        data-bs-toggle="modal"
        data-bs-target={"#delete-" + taskData.id}
        className="task-delete-icon"
      />

      <div
        class="delete-task-modal modal fade"
        id={"delete-" + taskData.id}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Delete Task</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div class="modal-body">Are you sure to delete it?</div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={function () {
                  deleteTask();
                }}
              >
                Sure
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteTaskBtn;
