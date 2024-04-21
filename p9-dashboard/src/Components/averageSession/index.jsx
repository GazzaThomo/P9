import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useUserAverageSessions from "../../hooks/averageSessions.js"; // Path to your custom hook

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { sessionLength } = payload[0].payload;
    return (
      <div
        style={{
          backgroundColor: "#fff",
          color: "#ff0000",
          padding: "5px",
          borderRadius: "5px",
        }}
      >
        <p>{`${sessionLength} min`}</p>
      </div>
    );
  }

  return null;
};

const daysInFrench = ["L", "M", "M", "J", "V", "S", "D"];

const UserAverageSessionsChart = ({ userId }) => {
  const userAverageSessions = useUserAverageSessions(userId);

  if (!userAverageSessions) {
    return <div>Loading...</div>;
  }

  const { sessions } = userAverageSessions.data;

  return (
    <div className="lineChart">
      {/* <div className="title">
        <h2>Durée moyenne des sessions</h2>
      </div> */}
      <ResponsiveContainer className="responsive-container">
        <LineChart data={sessions}>
          <XAxis
            dataKey="day"
            tickFormatter={(value) => daysInFrench[value - 1]}
            axisLine={false}
            tickLine={false}
            className="xaxis"
            fill="#fff"
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="sessionLength"
            dot={false}
            stroke="#fff"
            strokeWidth={2}
            activeDot={{ stroke: "#f0f0f0", strokeWidth: 5, r: 5 }}
            className="line"
            // isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserAverageSessionsChart;
