import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
  PolarAngleAxis,
} from "recharts";
import useUserMainData from "../../hooks/mainData.js";
import { USER_MAIN_DATA } from "../../mockApi/mockData.js";

const UserScore = ({ userId, isMockData }) => {
  let userMainData;
  if (isMockData) {
    userMainData = USER_MAIN_DATA.filter((item) => item.id === userId)[0];
  } else {
    //get data from hook
    userMainData = useUserMainData(userId);

    //needs raplacing with usEffect at some point
    if (!userMainData) {
      return <div>Loading...</div>;
    }

    userMainData = userMainData.data;
  }

  // need nullish here because there are 2 keys in the data, score and todayScore ???
  const score = userMainData.todayScore ?? userMainData.score;

  //format data for the chart
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
