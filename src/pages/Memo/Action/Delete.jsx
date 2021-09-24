import React, {useState, useEffect} from "react";
import {firestore} from "../../../services/firebase";
import {FaTrashAlt} from "react-icons/fa";

import "./Delete.scss";

const DeleteMemoBtn = (props) => {
  const [memoData, setMemoData] = useState(props.data);

  function deleteMemo() {
    firestore
      .collection("users")
      .doc(props.userId)
      .collection("memo")
      .doc(memoData.id)
      .delete()
      .then(() => {
        props.onFlag();
      });
  }

  return (
    <>
      <button
        type="button"
        class="btn-delete-memo btn btn-outline-danger rounded-end"
        data-bs-toggle="modal"
        data-bs-target={"#delete-" + memoData.id}
      >
        <FaTrashAlt />
      </button>

      <div
        class="delete-memo-modal modal fade"
        id={"delete-" + memoData.id}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Delete Memo</h5>
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
                  deleteMemo();
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

export default DeleteMemoBtn;
