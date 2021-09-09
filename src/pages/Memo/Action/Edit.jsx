import React, {useState, useEffect} from "react";
import {firestore} from "../../../services/firebase";
import {FaEdit} from "react-icons/fa";

import "./Edit.scss";

const moment = require("moment");

const EditMemoBtn = (props) => {
  const [memoData, setMemoData] = useState(props.data);

  function updateMemo(title, content) {
    firestore
      .collection("users")
      .doc(props.userId)
      .collection("memo")
      .doc(memoData.id)
      .update({
        title: title,
        content: content,
        last_update: moment(new Date()).format("YYYY-MM-DD HH:mm"),
        flag: new Date().getTime(),
      })
      .then(() => {
        props.onFlag();
      });
  }

  return (
    <>
      <button
        type="button"
        class="btn-edit-memo btn btn-outline-dark rounded-start"
        data-bs-toggle="modal"
        data-bs-target={"#edit-" + memoData.id}
      >
        <FaEdit />
      </button>

      <div
        class="modal fade"
        id={"edit-" + memoData.id}
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
                updateMemo(e.target.title.value, e.target.content.value);
              }.bind(this)}
            >
              <div class="modal-header">
                <h5 class="modal-title">Edit Memo</h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div class="modal-body">
                <div class="mb-3">
                  <label for="edit-memo-title" class="col-form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="edit-memo-title"
                    name="title"
                    defaultValue={memoData["title"]}
                  />
                </div>
                <div class="mb-3">
                  <label for="edit-memo-content" class="col-form-label">
                    Content
                  </label>
                  <textarea
                    class="form-control"
                    id="edit-memo-content"
                    name="content"
                    defaultValue={memoData["content"]}
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
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditMemoBtn;
