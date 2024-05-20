//add tooltip if time permits

import useUserPerformence from "../../hooks/userPerformance.js";
import { useEffect, useState } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { USER_PERFORMANCE } from "../../mockApi/mockData.js";

const UserPerformanceChart = ({ userId, isMockData }) => {
  //create state for user data
  const [userData, setUserData] = useState(null);
  //create state for loading status
  const [loading, setLoading] = useState(true);

  //useEffect to fetch data when component mounts or when userId or isMockData changes
  useEffect(() => {
    //define an async function to fetch the data
    const fetchData = async () => {
      if (isMockData) {
        //filter the mock data to find the user performance for the given userId
        const filteredData = USER_PERFORMANCE.filter(
          (item) => item.userId === userId
        )[0];
        //set the userData state with the filtered data
        setUserData(filteredData);
      } else {
        //fetch the user performance data using the custom hook
        const userPerformanceResponse = await useUserPerformence(userId);
        //check if the response has data
        if (userPerformanceResponse && userPerformanceResponse.data) {
          //set the userData state with the fetched data
          setUserData(userPerformanceResponse.data);
        }
      }
      //set loading to false after data is fetched
      setLoading(false);
    };

    //call the fetchData function
    fetchData();
  }, [userId, isMockData]);

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
          <PolarAngleAxis dataKey="kind" />
          <Radar name="user" dataKey="value" fill="#ff0101" fillOpacity={0.7} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserPerformanceChart;
