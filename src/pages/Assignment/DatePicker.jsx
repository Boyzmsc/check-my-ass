import React, {useState, useEffect} from "react";
import DatePicker from "react-datepicker";

import {FaAngleDoubleRight} from "react-icons/fa";

import "react-datepicker/dist/react-datepicker.css";
import "./Datepicker.scss";

const moment = require("moment");

const DatePickerComponent = (props) => {
  const [startDate, setStartDate] = useState(
    new Date(initDate(new Date()) + "00:00:00"),
  );
  const [endDate, setEndDate] = useState(
    new Date(
      initDate(new Date().setMonth(new Date().getMonth() + 3)) + "23:59:59",
    ),
  );

  function initDate(date) {
    return moment(date).format("YYYY-MM-DDT");
  }

  const CustomInput = ({value, onClick}) => (
    <button className="date-btn btn btn-outline-dark" onClick={onClick}>
      {value}
    </button>
  );

  useEffect(() => {
    props.onBound(startDate.getTime(), endDate.getTime());
  }, [startDate, endDate]);

  return (
    <div className="datepicker d-flex align-items-center">
      <DatePicker
        className="left"
        selected={startDate}
        onChange={function (date) {
          setStartDate(new Date(initDate(date) + "00:00:00"));
        }}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        customInput={<CustomInput />}
      />
      <FaAngleDoubleRight className="arrow" />
      <DatePicker
        className="right"
        selected={endDate}
        onChange={function (date) {
          setEndDate(new Date(initDate(date) + "23:59:59"));
        }}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        customInput={<CustomInput />}
      />
    </div>
  );
};

export default DatePickerComponent;
