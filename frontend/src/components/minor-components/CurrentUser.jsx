import { useContext } from "react";
import { UserContext } from "../../App";

const CurrentUser = () => {
  const user = useContext(UserContext);

  return user ? <span className="currentUser">{user?.username}</span> : <></>;
};

export default CurrentUser;
