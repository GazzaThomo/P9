import { useFetch } from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import { transformMockData } from "../../utils/dataTransform";

const Nutrients = ({ userId, isMockData }) => {
  const [keyData, setKeyData] = useState("");
  const [loading, setLoading] = useState(true);
  const userMainDataResponse = useFetch("mainData", userId, isMockData);

  useEffect(() => {
    if (userMainDataResponse) {
      const transformedKeyData = transformMockData(
        "keyData",
        userMainDataResponse.keyData
      );
      setKeyData(transformedKeyData);
      setLoading(false);
    }
  }, [userMainDataResponse]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="nutrients">
      {keyData.map(({ key, value, image, title }) => (
        <div key={key} className="nutrients-container">
          <img src={image} alt={key} className="nutrients-image" />
          <div className="nutrients-text">
            <p className="nutrients-text-data">{`${value}${
              key === "calorieCount" ? "kCal" : "g"
            }`}</p>
            <p className="nutrients-text-type">{title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Nutrients;
