//add tooltip if time permits

import useUserPerformence from "../../hooks/userPerformance.js";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

const UserPerformanceChart = ({ userId }) => {
  const userPerformance = useUserPerformence(userId);

  if (!userPerformance) {
    return <div>Loading...</div>;
  }

  const wordMap = {
    6: "Intensité",
    1: "Cardio",
    5: "Vitesse",
    4: "Force",
    3: "Endurance",
    2: "Energie",
  };

  const userData = userPerformance.data;

  const transformedData = userData.data.map((item) => ({
    ...item,
    kind: wordMap[item.kind.toString()],
  }));

  const order = [
    "Intensité",
    "Vitesse",
    "Force",
    "Endurance",
    "Energie",
    "Cardio",
  ];
  transformedData.sort((a, b) => order.indexOf(a.kind) - order.indexOf(b.kind));

  // console.log(transformedData);

  return (
    <div className="radialChart">
      {" "}
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

const maxValue = (array) => {
  let max = Number.MIN_VALUE;
  for (let i = 0; i < array.length; i++) {
    if (array[i].value > max) {
      max = array[i].value;
    }
  }
  return max;
};

export default UserPerformanceChart;
