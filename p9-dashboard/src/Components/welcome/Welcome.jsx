import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";

function Welcome({ userId, isMockData }) {
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const userMainDataResponse = useFetch("mainData", userId, isMockData);

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
      <h1 className="hello-text">
        Bonjour, <span className="hello-text-user">{userName}</span>
      </h1>
      <p className="hello-text-sub-message">
        Félicitations ! Vous avez explosé vos objectifs hier 👏
      </p>
    </div>
  );
}

export default Welcome;
