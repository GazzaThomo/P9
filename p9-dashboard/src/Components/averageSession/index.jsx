import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useFetch } from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import { transformMockData } from "../../utils/dataTransform";

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

const UserAverageSessionsChart = ({ userId, isMockData }) => {
  //create state for sessions
  const [sessions, setSessions] = useState(null);
  //create state for loading status
  const [loading, setLoading] = useState(true);
  //call to fetch the data
  const userAverageSessionsResponse = useFetch(
    "averageSession",
    userId,
    isMockData
  );

  //useEffect to manage loading status
  useEffect(() => {
    if (userAverageSessionsResponse) {
      //use utility function to return clean data
      const transformedData = transformMockData(
        "averageSession",
        userAverageSessionsResponse.sessions
      );
      setSessions(transformedData);
      setLoading(false);
    }
  }, [userAverageSessionsResponse]);

  //show loading message if data is still being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="lineChart">
      <ResponsiveContainer className="responsive-container">
        <LineChart data={sessions}>
          <XAxis
            dataKey="day"
            // tickFormatter={(value) => value}
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
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserAverageSessionsChart;
