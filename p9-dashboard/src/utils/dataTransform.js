import caloriesIcon from "../assets/calories-icon.png";
import carbsIcon from "../assets/carbs-icon.png";
import fatIcon from "../assets/fat-icon.png";
import proteinIcon from "../assets/protein-icon.png";

//utility function to transform average session data
const transformAverage = (data) => {
  const daysInFrench = ["L", "M", "M", "J", "V", "S", "D"];
  return data.map((session) => ({
    ...session,
    day: daysInFrench[session.day - 1],
  }));
};

//utility function to transform activity data
const transformActivity = (data) => {
  return data.map((session, index) => ({
    ...session,
    index: index + 1,
  }));
};

//utility function to transform performance data
const transformPerformance = (data) => {
  const wordMap = {
    6: "Intensité",
    1: "Cardio",
    5: "Vitesse",
    4: "Force",
    3: "Endurance",
    2: "Energie",
  };

  const transformedData = data.map((item) => ({
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

  return transformedData;
};

// Utility function to transform key data
const transformKeyData = (data) => {
  const imageMap = {
    calorieCount: caloriesIcon,
    proteinCount: proteinIcon,
    carbohydrateCount: carbsIcon,
    lipidCount: fatIcon,
  };

  const titleMap = {
    calorieCount: "Calories",
    proteinCount: "Proteines",
    carbohydrateCount: "Glucides",
    lipidCount: "Lipides",
  };

  return Object.entries(data).map(([key, value]) => ({
    key,
    value,
    image: imageMap[key],
    title: titleMap[key],
  }));
};

// Utility function to transform score data
const transformScoreData = (data) => {
  const score = data.todayScore ?? data.score ?? 0;
  return [
    {
      name: "Score",
      value: score * 100,
      fill: "#ff0000",
    },
  ];
};

// Main switch function to call specific transformation functions based on data type
export function transformMockData(dataType, data) {
  switch (dataType) {
    case "averageSession":
      return transformAverage(data);
    case "mainData":
      return transformMain(data);
    case "activity":
      return transformActivity(data);
    case "performance":
      return transformPerformance(data);
    case "keyData":
      return transformKeyData(data);
    case "score":
      return transformScoreData(data);
    default:
      return null;
  }
}
