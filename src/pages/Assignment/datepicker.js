import React, {useState} from "react";
import DatePicker from "react-datepicker";

import {FaAngleDoubleRight} from "react-icons/fa";

import "react-datepicker/dist/react-datepicker.css"
import "./datepicker.scss"

// { setSearchDateString, setSelectedEndDateString }

const DatePickerComponent = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const dateToString = (date) => {
    return date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0')
  }

  const CustomInput = ({ value, onClick }) => (
    <button className="date-btn btn btn-outline-dark" onClick={onClick}>
      {value}
    </button>
  );

  // useEffect(() => {
  //   setSearchDateString(dateToString(startDate))
  //   setSelectedEndDateString(dateToString(endDate))
  // }, [startDate, endDate])

  return (
    <div className = "datepicker d-flex align-items-center">
      <DatePicker
        className = "left"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        customInput={<CustomInput />}
      />
      <FaAngleDoubleRight className = "arrow" />
      <DatePicker
        className = "right"
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        customInput={<CustomInput />}
      />
    </div>
  );
}

export default DatePickerComponent;