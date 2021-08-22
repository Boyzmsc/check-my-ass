import React, {useState} from "react";
import {FaCheckCircle} from "react-icons/fa";

const CheckTaskBtn = () => {
  const [status, setStatus] = useState(false);

  if (status === false){
    return (
      <>
        <button
          type="button"
          className="btn btn-outline-success"
          onClick={function (e) {
            setStatus(true);
          }.bind(this)}
        >
          <FaCheckCircle />
        </button>
      </>
    );
  }else if (status === true){
    return (
      <>
        <button
          type="button"
          className="btn btn-success"
          onClick={function (e) {
            setStatus(false);
          }.bind(this)}
        >
          <FaCheckCircle />
        </button>
      </>
    );
  }
};

export default CheckTaskBtn;
