import { useEffect, useState } from "react";
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
import { useFetch } from "../../hooks/useFetch";
import { transformMockData } from "../../utils/dataTransform";

//for tooltip, needs changing css side
// https://medium.com/@rutudhokchaule/implementing-custom-tooltips-and-legends-using-recharts-98b6e3c8b712
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

//need to seperate the css from this, it's horrible, but easy access at least
//used to create the legend seperate from th chart so it aligns correctly with title
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

//this is the main component that will render on the page
const UserActivityChart = ({ userId, isMockData }) => {
  const [sessions, setSessions] = useState(null);
  const [loading, setLoading] = useState(true);
  const userActivityResponse = useFetch("activity", userId, isMockData);

  useEffect(() => {
    if (userActivityResponse) {
      const transformedSessions = transformMockData(
        "activity",
        userActivityResponse.sessions
      );
      setSessions(transformedSessions);
      setLoading(false);
    }
  }, [userActivityResponse]);

  if (loading) {
    return <div>Loading...</div>;
  }

  //create 2 variables for the min and max on graph axis
  // const minKilogram = Math.min(...sessions.map((session) => session.kilogram));
  // const maxKilogram = Math.max(...sessions.map((session) => session.kilogram));

  //return the html
  return (
    <div className="barChart">
      <div className="title">
        <h2>Activité quotidienne</h2>
        <LegendComponent />
      </div>
      <ResponsiveContainer className="responsive-container-bar-chart">
        <BarChart data={sessions} className="chart">
          <CartesianGrid
            strokeDasharray="0"
            horizontal={true}
            vertical={false}
          />
          <XAxis dataKey="index" tickLine={false} axisLine={false} />
          <YAxis
            yAxisId="right"
            dataKey="kilogram"
            orientation="right"
            tickLine={false}
            axisLine={false}
            // domain={[minKilogram - 1, maxKilogram + 1]}
            domain={["dataMin - 1", "dataMax + 1"]}
          />
          <YAxis
            yAxisId="left"
            dataKey="calories"
            orientation="left"
            tickLine={false}
            axisLine={false}
            hide={true}
          />
          <Tooltip content={<CustomTooltip />} offset={40} />
          <Bar
            yAxisId="right"
            dataKey="kilogram"
            fill="#282D30"
            name="Kilogram"
            barSize={10}
            radius={[10, 10, 0, 0]}
          />
          <Bar
            yAxisId="left"
            dataKey="calories"
            fill="#E60000"
            name="Calories"
            barSize={10}
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserActivityChart;
