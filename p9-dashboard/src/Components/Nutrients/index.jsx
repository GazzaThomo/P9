import useUserMainData from "../../hooks/mainData";
import caloriesIcon from "../../assets/calories-icon.png";
import carbsIcon from "../../assets/carbs-icon.png";
import fatIcon from "../../assets/fat-icon.png";
import proteinIcon from "../../assets/protein-icon.png";

const Nutrients = ({ userId }) => {
  const userMainData = useUserMainData(userId);
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

  if (!userMainData) {
    return <div>Loading...</div>;
  }

  const keyData = userMainData.data.keyData;

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
