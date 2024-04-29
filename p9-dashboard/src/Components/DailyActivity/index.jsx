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
import { USER_ACTIVITY } from "../../mockApi/mockData.js";

//for tooltip, needs changing css side
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
  let sessions;
  if (isMockData) {
    const filteredData = USER_ACTIVITY.filter(
      (item) => item.userId === userId
    )[0];
    sessions = filteredData.sessions;
  } else {
    const userActivityResponse = useUserActivity(userId);

    //check the data is there, if not show loading ==> can put inside a useEffect later
    if (!userActivityResponse || !userActivityResponse.data) {
      return <div>Loading...</div>;
    }
    //deconstruct the data
    sessions = userActivityResponse.data.sessions;
  }

  //return the html
  return (
    <div className="barChart">
      <div className="title">
        <h2>Activité quotidienne</h2>
        <LegendComponent />
      </div>
      <ResponsiveContainer className="responsive-container-bar-chart">
        <BarChart data={sessions} className="chart">
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
