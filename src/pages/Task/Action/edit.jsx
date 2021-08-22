import React from "react";
import {FaEdit} from "react-icons/fa";

import "./edit.scss";

const EditTaskBtn = () => {
  return (
    <>
      <button
        type="button"
        class="btn-edit-task btn btn-outline-dark rounded-start"
        data-bs-toggle="modal"
        data-bs-target="#edit-task-modal"
      >
        <FaEdit />
      </button>

      <div
        class="modal fade"
        id="edit-task-modal"
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
                Edit Task
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div class="modal-body">
              <form>
                <div class="mb-3">
                  <label for="edit-task-title" class="col-form-label">
                    Title
                  </label>
                  <input type="text" class="form-control" id="edit-task-title" />
                </div>
                <div class="mb-3">
                  <label for="edit-task-content" class="col-form-label">
                    Content
                  </label>
                  <textarea
                    class="form-control"
                    id="edit-task-content"
                  ></textarea>
                </div>
              </form>
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditTaskBtn;
