import useUserMainData from "../../hooks/mainData";
import caloriesIcon from "../../assets/calories-icon.png";
import carbsIcon from "../../assets/carbs-icon.png";
import fatIcon from "../../assets/fat-icon.png";
import proteinIcon from "../../assets/protein-icon.png";
import { USER_MAIN_DATA } from "../../mockApi/mockData";

const Nutrients = ({ userId, isMockData }) => {
  console.log(USER_MAIN_DATA);
  let keyData;

  if (isMockData) {
    let filteredData = USER_MAIN_DATA.filter((item) => item.id === userId)[0];
    keyData = filteredData.keyData;
  } else {
    const userMainData = useUserMainData(userId);
    if (!userMainData) {
      return <div>Loading...</div>;
    }
    keyData = userMainData.data.keyData;
  }

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

  // const keyData = userMainData.data.keyData;

  return (
    <div className="nutrients">
      {Object.entries(keyData).map(([key, value]) => (
        <div key={key} className="nutrients-container">
          <img src={imageMap[key]} alt={key} className="nutrients-image" />
          <div className="nutrients-text">
            <p className="nutrients-text-data">{`${value}${
              key === "calorieCount" ? "kCal" : "g"
            }`}</p>
            <p className="nutrients-text-type">{titleMap[key]}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Nutrients;
