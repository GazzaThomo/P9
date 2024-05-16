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
import { USER_AVERAGE_SESSIONS } from "../../mockApi/mockData.js";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { sessionLength } = payload[0].payload;
    return (
      <div
        style={{
          backgroundColor: "#fff",
          color: "black",
          padding: "5px",
        }}
      >
        <p>{`${sessionLength} min`}</p>
      </div>
    );
  }

  return null;
};

const daysInFrench = ["L", "M", "M", "J", "V", "S", "D"];

const UserAverageSessionsChart = ({ userId, isMockData }) => {
  let sessions;
  if (isMockData) {
    const filteredData = USER_AVERAGE_SESSIONS.filter(
      (item) => item.userId === userId
    )[0];
    sessions = filteredData.sessions;
  } else {
    const userAverageSessions = useUserAverageSessions(userId);

    if (!userAverageSessions) {
      return <div>Loading...</div>;
    }
    sessions = userAverageSessions.data.sessions;
  }

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
