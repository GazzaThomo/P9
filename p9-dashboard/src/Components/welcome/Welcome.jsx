import { useEffect, useState } from "react";
import useUserMainData from "../../hooks/mainData.js";

function Welcome({ userId, isMockData }) {
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const userMainDataResponse = useUserMainData(userId, isMockData);

  useEffect(() => {
    if (userMainDataResponse) {
      setUserName(userMainDataResponse.userInfos.firstName);
      setLoading(false);
    }
  }, [userMainDataResponse]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>
        Bonjour, <span>{userName}</span>
      </p>
      <p>Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
    </div>
  );
}

export default Welcome;
