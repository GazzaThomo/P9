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
import useUserAverageSessions from "../../hooks/averageSessions.js";

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
  const [activeIndex, setActiveIndex] = useState(null);

  if (!userAverageSessions) {
    return <div>Loading...</div>;
  }

  const { sessions } = userAverageSessions.data;

  const renderLine = (props) => {
    const { data, stroke, strokeWidth, activeDot, dot, isAnimationActive } =
      props;

    return (
      <Line
        type="monotone"
        dataKey="sessionLength"
        stroke={stroke}
        strokeWidth={strokeWidth}
        dot={dot}
        activeDot={activeDot}
        isAnimationActive={isAnimationActive}
        data={data.map((entry, index) => {
          const grayStyle = index >= activeIndex ? { stroke: "#f0f0f0" } : {};
          return { ...entry, ...grayStyle };
        })}
      />
    );
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={sessions}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        background={{ fill: "#ff0000" }}
        onMouseMove={(state) => setActiveIndex(state.activeTooltipIndex)}
        onMouseLeave={() => setActiveIndex(null)}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="day"
          tickFormatter={(value) => daysInFrench[value - 1]}
        />
        <YAxis type="number" domain={[0, "dataMax + 10"]} />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line
          type="monotone"
          dataKey="sessionLength"
          stroke="#000"
          strokeWidth={2}
          dot={{ stroke: "#000", strokeWidth: 2, r: 5 }}
          activeDot={{ stroke: "#f0f0f0", strokeWidth: 5, r: 8 }}
          isAnimationActive={false}
          renderLine={renderLine}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default UserAverageSessionsChart;
