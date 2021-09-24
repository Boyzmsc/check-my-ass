import {ResponsivePie} from "@nivo/pie";

const AssPieChart = (props) => {
  const data = props.data;

  const theme = {
    fontSize: 14,
  };

  return (
    <>
      <ResponsivePie
        data={data}
        theme={theme}
        margin={{top: 30, right: 30, bottom: 110, left: 30}}
        innerRadius={0.5}
        padAngle={1}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={{scheme: "pastel1"}}
        borderWidth={1}
        borderColor={{from: "color", modifiers: [["darker", 0.2]]}}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsStraightLength={15}
        arcLinkLabelsDiagonalLength={15}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{from: "color"}}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{from: "color", modifiers: [["darker", 3]]}}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: "Done",
            },
            id: "lines",
          },
          {
            match: {
              id: "Left",
            },
            id: "lines",
          },
          {
            match: {
              id: "Miss",
            },
            id: "lines",
          },
        ]}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 65,
            itemsSpacing: 20,
            itemWidth: 90,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "top-to-bottom",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000",
                },
              },
            ],
          },
        ]}
      />
    </>
  );
};

export default AssPieChart;
