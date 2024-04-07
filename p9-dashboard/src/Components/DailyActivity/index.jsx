import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useUserActivity from "../../hooks/userActivity.js";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`Day: ${payload[0].payload.day}`}</p>
        <p style={{ color: "#282D30" }}>{`Weight: ${payload[0].value} kg`}</p>
        <p style={{ color: "#E60000" }}>{`Calories: ${payload[1].value}`}</p>
      </div>
    );
  }

  return null;
};

const UserActivityChart = ({ id }) => {
  const userActivity = useUserActivity(id);

  const formattedData =
    userActivity && userActivity.data
      ? userActivity.data.sessions.map((session) => ({
          ...session,
          day: session.day.substring(5), //need to format this to be more readable
        }))
      : [];

  console.log(formattedData);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={formattedData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        barCategoryGap="20%"
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis yAxisId="left" orientation="left" stroke="#282D30" />
        <YAxis yAxisId="right" orientation="right" stroke="#E60000" />
        <Tooltip content={<CustomTooltip />} />
        <Bar yAxisId="left" dataKey="kilogram" fill="#282D30" />
        <Bar yAxisId="right" dataKey="calories" fill="#E60000" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default UserActivityChart;
