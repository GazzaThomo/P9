import useUserMainData from "../../hooks/mainData";
import caloriesIcon from "../../assets/calories-icon.png";
import carbsIcon from "../../assets/carbs-icon.png";
import fatIcon from "../../assets/fat-icon.png";
import proteinIcon from "../../assets/protein-icon.png";
import { USER_MAIN_DATA } from "../../mockApi/mockData";
import { useEffect, useState } from "react";

const Nutrients = ({ userId, isMockData }) => {
  // // create state for key data
  // const [keyData, setKeyData] = useState(null);
  // // create state for loading status
  // const [loading, setLoading] = useState(true);

  // // useEffect to fetch data when component mounts or when userId or isMockData changes
  // useEffect(() => {
  //   // define an async function to fetch the data
  //   const fetchData = async () => {
  //     if (isMockData) {
  //       // filter the mock data to find the user main data for the given userId
  //       let filteredData = USER_MAIN_DATA.filter(
  //         (item) => item.id === userId
  //       )[0];
  //       // set the keyData state with the filtered data
  //       setKeyData(filteredData.keyData);
  //     } else {
  //       // fetch the user main data using the custom hook
  //       const userMainData = await useUserMainData(userId);
  //       // check if the response has data
  //       if (userMainData && userMainData.data) {
  //         // set the keyData state with the fetched data
  //         setKeyData(userMainData.data.keyData);
  //       }
  //     }
  //     // set loading to false after data is fetched
  //     setLoading(false);
  //   };

  //   // call the fetchData function
  //   fetchData();
  // }, [userId, isMockData]);

  // // show loading message if data is still being fetched
  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  const [keyData, setKeyData] = useState("");
  const [loading, setLoading] = useState(true);
  const userMainDataResponse = useUserMainData(userId, isMockData);

  useEffect(() => {
    if (userMainDataResponse) {
      setKeyData(userMainDataResponse.keyData);
      setLoading(false);
    }
  }, [userMainDataResponse]);

  if (loading) {
    return <div>Loading...</div>;
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
