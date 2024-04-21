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
  console.log(userPerformance);

  if (!userPerformance) {
    return <div>Loading...</div>;
  }

  const userData = userPerformance.data;

  const transformedData = userData.data.map((item) => ({
    ...item,
    kind: userData.kind[item.kind.toString()],
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={transformedData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="kind" />
        <PolarRadiusAxis />
        <Radar
          name="user"
          dataKey="value"
          stroke="#000"
          fill="#f0f0f0"
          fillOpacity={0.6}
        />
      </RadarChart>
    </ResponsiveContainer>
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
