import React from "react";
import {FaTrashAlt} from "react-icons/fa";

import "./delete.scss";

const DeleteTaskBtn = () => {
  return (
    <>
      <button
        type="button"
        class="btn-delete-task btn btn-outline-danger rounded-end"
        data-bs-toggle="modal"
        data-bs-target="#delete-task-modal"
      >
        <FaTrashAlt />
      </button>

      <div
        class="modal fade"
        id="delete-task-modal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">
                Delete Task
              </h5>
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
              <button type="button" class="btn btn-danger">
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
