import React, {useState, useEffect} from "react";
import {firestore} from "../../../services/firebase";

import "./Add.scss";

const moment = require("moment");

const NewMemoBtn = (props) => {
  const userId = props.userId;

  function storeMemo(title, content) {
    firestore
      .collection("users")
      .doc(userId)
      .collection("memo")
      .add({
        title: title,
        content: content,
        last_update: moment(new Date()).format("YYYY-MM-DD HH:mm"),
        status: false,
        flag: new Date().getTime(),
      })
      .then(() => {
        window.location.reload();
      });
  }

  return (
    <>
      <button
        type="button"
        class="btn-new-memo btn btn-outline-dark"
        data-bs-toggle="modal"
        data-bs-target="#new-memo-modal"
      >
        New
      </button>

      <div
        class="modal fade"
        id="new-memo-modal"
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
                storeMemo(e.target.title.value, e.target.content.value);
              }.bind(this)}
            >
              <div class="modal-header">
                <h5 class="modal-title">New Memo</h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div class="modal-body">
                <div class="mb-3">
                  <label for="new-memo-title" class="col-form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="new-memo-title"
                    name="title"
                  />
                </div>
                <div class="mb-3">
                  <label for="new-memo-content" class="col-form-label">
                    Content
                  </label>
                  <textarea
                    class="form-control"
                    id="new-memo-content"
                    name="content"
                  ></textarea>
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

export default NewMemoBtn;
