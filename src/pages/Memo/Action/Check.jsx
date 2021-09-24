import React, {useState} from "react";
import {firestore} from "../../../services/firebase";
import {FaCheckCircle} from "react-icons/fa";

const CheckMemoBtn = (props) => {
  const [status, setStatus] = useState(props.data["status"]);

  function updateStatus(bool) {
    firestore
      .collection("users")
      .doc(props.userId)
      .collection("memo")
      .doc(props.data["id"])
      .update({
        status: bool,
      })
      .then(() => {
        setStatus(bool);
      });
  }

  if (status === false) {
    return (
      <>
        <button
          type="button"
          className="btn btn-outline-success"
          onClick={function (e) {
            setStatus(true);
            updateStatus(true);
          }.bind(this)}
        >
          <FaCheckCircle />
        </button>
      </>
    );
  } else {
    return (
      <>
        <button
          type="button"
          className="btn btn-success"
          onClick={function (e) {
            setStatus(false);
            updateStatus(false);
          }.bind(this)}
        >
          <FaCheckCircle />
        </button>
      </>
    );
  }
};

export default CheckMemoBtn;
