import { ResponsiveLine } from '@nivo/line'
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import React, { useState, useEffect } from "react";

const LineChart1 = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [quOrd, setQuOrd] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3702/qOrdNum")
      .then((res) => res.json())
      .then((data) => {
        const formattedData = [
          {
            id: "訂單數",
            color: "hsl(249, 70%, 50%)",
            data: data.map((d) => ({ x: "Q"+d.x, y: d.y })),
          },
        ];
        setQuOrd(formattedData);
      });
  }, []);
  return (
    <ResponsiveLine
      data={quOrd}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 5,
            },
            //X,Y軸座標字
            text: {
              fill: colors.grey[100],
              fontSize: 20
            },
          },
        },
        //右側資料
        legends: {
          text: {
            fill: colors.grey[100],
            fontSize: 20
          },
        },
        tooltip: {
          container: {
            color: colors.primary[500],
          },
        },
      }}
      colors={isDashboard ? { datum: "color" } : { scheme: "nivo" }} // added
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: 'point' }}
      yScale={{
        type: 'linear',
        min: '0',
        max: '16',
        stacked: true,
        reverse: false,
        tickCount: 6,
        // tickValue: 6
      }}
      lineWidth={6}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: 'bottom',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'transportation',
        legendOffset: 36,
        legendPosition: 'middle',
        legend: isDashboard ? undefined : "transportation" // added
      }}
      axisLeft={{
        orient: 'left',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'count',
        legendOffset: -40,
        legendPosition: 'middle',
        legend: isDashboard ? undefined : "count", // added
      }}
      pointSize={10}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: 'left-to-right',
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: 'circle',
          symbolBorderColor: 'rgba(0, 0, 0, .5)',
          effects: [
            {
              on: 'hover',
              style: {
                itemBackground: 'rgba(0, 0, 0, .03)',
                itemOpacity: 1
              },
            },
          ],
        },
      ]}
    />

  );

};
export default LineChart1;