import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
  PolarAngleAxis,
} from "recharts";
import useUserMainData from "../../hooks/mainData.js";

const UserScore = ({ userId }) => {
  //get data from hook
  const userMainData = useUserMainData(userId);

  //needs raplacing with usEffect at some point
  if (!userMainData) {
    return <div>Loading...</div>;
  }

  // need nullish here because there are 2 keys in the data, score and todayScore ???
  const score = userMainData.data.todayScore ?? userMainData.data.score;

  //format data for the chart
  const scoreData = [
    {
      name: "Score",
      value: score * 100,
      fill: "#ff0000",
    },
  ];

  return (
    <ResponsiveContainer>
      <RadialBarChart
        cx="50%"
        cy="50%"
        innerRadius="50%"
        startAngle={210} //this is for the gap at bottom
        endAngle={-30}
        barSize={15}
        data={scoreData}
      >
        <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
        <RadialBar
          label={{ fill: "#000" }} //need to fond a way to move this to center
          cornerRadius={10}
          dataKey="value"
        />
        {/* <Legend
          iconSize={10}
          layout="vertical"
          verticalAlign="middle"
          align="right"
          wrapperStyle={{ top: 0, left: 350, lineHeight: "24px" }}
        /> */}
      </RadialBarChart>
    </ResponsiveContainer>
  );
};

export default UserScore;
