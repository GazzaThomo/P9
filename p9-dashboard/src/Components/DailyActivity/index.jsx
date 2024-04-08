import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Text,
} from "recharts";
import useUserActivity from "../../hooks/userActivity.js";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { kilogram, calories } = payload[0].payload;
    return (
      <div
        style={{
          backgroundColor: "#E60000",
          color: "white",
          padding: "5px",
          borderRadius: "5px",
        }}
      >
        <p>{`${kilogram.toFixed(0)}kg`}</p>
        <p>{`${calories.toFixed(0)} cal`}</p>
      </div>
    );
  }

  return null;
};

const LegendComponent = () => (
  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
    <div style={{ display: "flex", alignItems: "center" }}>
      <span
        style={{
          height: "10px",
          width: "10px",
          borderRadius: "50%",
          backgroundColor: "#282D30",
          display: "inline-block",
        }}
      ></span>
      <span style={{ marginLeft: "5px" }}>Kilogram</span>
    </div>
    <div style={{ display: "flex", alignItems: "center" }}>
      <span
        style={{
          height: "10px",
          width: "10px",
          borderRadius: "50%",
          backgroundColor: "#E60000",
          display: "inline-block",
        }}
      ></span>
      <span style={{ marginLeft: "5px" }}>Calories</span>
    </div>
  </div>
);

const UserActivityChart = ({ userId }) => {
  const userActivityResponse = useUserActivity(userId);

  if (!userActivityResponse || !userActivityResponse.data) {
    return <div>Loading...</div>;
  }

  const { sessions } = userActivityResponse.data;

  return (
    <div className="barChart">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "0 20px",
        }}
      >
        <h2>Activité quotidienne</h2>
        <LegendComponent />
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={sessions}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="kilogram" fill="#282D30" name="Kilogram" barSize={10} />
          <Bar dataKey="calories" fill="#E60000" name="Calories" barSize={10} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserActivityChart;
