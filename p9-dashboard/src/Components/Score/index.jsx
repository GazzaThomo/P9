import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
  PolarAngleAxis,
} from "recharts";
import useUserMainData from "../../hooks/mainData.js";
import { USER_MAIN_DATA } from "../../mockApi/mockData.js";
import { useEffect, useState } from "react";

const UserScore = ({ userId, isMockData }) => {
  // create state for user main data
  const [userMainData, setUserMainData] = useState(null);
  // create state for loading status
  const [loading, setLoading] = useState(true);

  // useEffect to fetch data when component mounts or when userId or isMockData changes
  useEffect(() => {
    // define an async function to fetch the data
    const fetchData = async () => {
      if (isMockData) {
        // filter the mock data to find the user main data for the given userId
        const filteredData = USER_MAIN_DATA.filter(
          (item) => item.id === userId
        )[0];
        // set the userMainData state with the filtered data
        setUserMainData(filteredData);
      } else {
        // fetch the user main data using the custom hook
        const userMainDataResponse = await useUserMainData(userId);
        console.log(userMainDataResponse);
        // check if the response has data
        if (userMainDataResponse && userMainDataResponse.data) {
          // set the userMainData state with the fetched data
          setUserMainData(userMainDataResponse.data);
        }
      }
      // set loading to false after data is fetched
      setLoading(false);
    };

    // call the fetchData function
    fetchData();
  }, [userId, isMockData]);

  // show loading message if data is still being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  // need nullish here because there are 2 keys in the data, score and todayScore ???
  const score = userMainData.todayScore ?? userMainData.score;

  // format data for the chart
  const scoreData = [
    {
      name: "Score",
      value: score * 100,
      fill: "#ff0000",
    },
  ];
  console.log(score);

  return (
    <div className="scoreChart">
      <ResponsiveContainer>
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="60%"
          outerRadius="70%"
          startAngle={210} // this is for the gap at bottom
          endAngle={-150}
          barSize={15}
          data={scoreData}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
          <RadialBar label={false} cornerRadius={10} dataKey="value" />
          <text
            x="25%"
            y="15%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="chart-title"
            style={{ fontSize: "16px", fontWeight: "bold" }}
          >
            Score
          </text>
          <text
            x="50%"
            y="45%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="progress-label"
            style={{
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            {`${scoreData[0].value}%`}
          </text>
          <text
            x="50%"
            y="55%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="progress-sub-label"
            style={{ fontSize: "16px", fill: "#888" }}
          >
            de votre
          </text>
          <text
            x="50%"
            y="65%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="progress-sub-label"
            style={{ fontSize: "16px", fill: "#888" }}
          >
            objectif
          </text>
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserScore;
