//add tooltip if time permits

import useUserPerformence from "../../hooks/userPerformance.js";
import { useEffect, useState } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

const UserPerformanceChart = ({ userId, isMockData }) => {
  //create state for user data
  const [userData, setUserData] = useState(null);
  //create state for loading status
  const [loading, setLoading] = useState(true);
  const userPerformanceResponse = useUserPerformence(userId, isMockData);

  //useEffect to fetch data when component mounts or when userId or isMockData changes
  useEffect(() => {
    //define an async function to fetch the data
    if (userPerformanceResponse) {
      setUserData(userPerformanceResponse);
      setLoading(false);
    }

    //call the fetchData function
  }, [userPerformanceResponse]);

  //show loading message if data is still being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  //map the kinds to readable words
  const wordMap = {
    6: "Intensité",
    1: "Cardio",
    5: "Vitesse",
    4: "Force",
    3: "Endurance",
    2: "Energie",
  };

  //transform the data to include the readable kind names
  const transformedData = userData.data.map((item) => ({
    ...item,
    kind: wordMap[item.kind.toString()],
  }));

  //define the order of the kinds
  const order = [
    "Intensité",
    "Vitesse",
    "Force",
    "Endurance",
    "Energie",
    "Cardio",
  ];
  //sort the transformed data based on the defined order
  transformedData.sort((a, b) => order.indexOf(a.kind) - order.indexOf(b.kind));

  //return the chart component
  return (
    <div className="radialChart">
      <ResponsiveContainer className="responsive-container">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={transformedData}>
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
