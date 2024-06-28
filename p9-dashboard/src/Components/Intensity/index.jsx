import { useEffect, useState } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";
import { useFetch } from "../../hooks/useFetch";
import { transformMockData } from "../../utils/dataTransform";

const UserPerformanceChart = ({ userId, isMockData }) => {
  //create state for user data
  const [userData, setUserData] = useState(null);
  //create state for loading status
  const [loading, setLoading] = useState(true);

  //use the useFetch function to get the performance data
  const userPerformanceResponse = useFetch("performance", userId, isMockData);

  //useEffect to handle the data fetched by useFetch
  useEffect(() => {
    if (userPerformanceResponse) {
      const transformedData = transformMockData(
        "performance",
        userPerformanceResponse.data
      );
      setUserData(transformedData);
      setLoading(false);
    }
  }, [userPerformanceResponse]);

  //show loading message if data is still being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  //return the chart component
  return (
    <div className="radialChart">
      <ResponsiveContainer className="responsive-container">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={userData}>
          <PolarGrid radialLines={false} />
          <PolarAngleAxis
            dataKey="kind"
            tick={{ fill: "#fff", fontSize: 12, fontWeight: 500 }}
          />
          <Radar name="user" dataKey="value" fill="#ff0101" fillOpacity={0.7} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserPerformanceChart;
