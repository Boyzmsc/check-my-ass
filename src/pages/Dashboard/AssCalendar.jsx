import {ResponsiveCalendar} from "@nivo/calendar";

const moment = require("moment");

const AssCalendar = (props) => {
  const data = props.data;

  const thisYear = new Date().getFullYear();
  const fromDate = thisYear + "-01-01";
  const toDate = thisYear + "-12-31";

  const theme = {
    fontSize: 12,
  };

  return (
    <>
      <ResponsiveCalendar
        data={data}
        from={fromDate}
        to={toDate}
        theme={theme}
        emptyColor="#eeeeee"
        colors={["#f3afa4", "#f39281", "#f47560", "#c7523d"]}
        // colors={["#99ffbb", "#00cc44", "#00802b", "#006622"]}
        minValue="auto"
        yearLegendOffset={12}
        margin={{top: 0, right: 40, bottom: 0, left: 50}}
        monthLegendOffset={12}
        monthBorderColor="#ffffff"
        daySpacing={2}
        dayBorderWidth={3}
        dayBorderColor="#ffffff"
      />
    </>
  );
};

export default AssCalendar;
