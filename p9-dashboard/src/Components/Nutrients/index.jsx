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
    calorieCount: "calories",
    proteinCount: "proteines",
    carbohydrateCount: "glucides",
    lipidCount: "lipides",
  };

  if (!userMainData) {
    return <div>Loading...</div>;
  }
  const keyData = userMainData.data.keyData;
  return (
    <div className="nutrient-container">
      {Object.entries(keyData).map(([key, value]) => (
        <div key={key}>
          <img src={imageMap[key]} alt={key} />
          <p>{`${value}${key === "calorieCount" ? "kCal" : "g"}`}</p>
          <p>{titleMap[key]}</p>
        </div>
      ))}
    </div>
  );
};

export default Nutrients;
