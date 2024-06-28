import React from "react";
import { Link } from "react-router-dom";
import { USER_MAIN_DATA } from "../../mockApi/mockData";

const UserSelection = () => {
  return (
    <div>
      <h1>Select a User</h1>
      <ul>
        {USER_MAIN_DATA.map((user) => (
          <li key={user.id}>
            <Link to={`/user/${user.id}`}>
              {user.userInfos.firstName} {user.userInfos.lastName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserSelection;
