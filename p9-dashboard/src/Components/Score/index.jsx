import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
  PolarAngleAxis,
} from "recharts";
import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";

function UserScore({ userId, isMockData }) {
  const [userMainData, setUserMainData] = useState("");
  const [userScoreData, setUserScoreData] = useState(null);
  const [loading, setLoading] = useState(true);
  const userMainDataResponse = useFetch("mainData", userId, isMockData);

  useEffect(() => {
    if (userMainDataResponse) {
      setUserMainData(userMainDataResponse.userInfos);
      const score =
        userMainDataResponse.todayScore ?? userMainDataResponse.score ?? 0;
      setUserScoreData(score);
      setLoading(false);
      console.log(console.log(userMainData));
    }
  }, [userMainDataResponse]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // format data for the chart
  const scoreData = [
    {
      name: "Score",
      value: userScoreData * 100,
      fill: "#ff0000",
    },
  ];
  // console.log(score);

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
}

export default UserScore;
