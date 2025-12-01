import { useContext } from "react";
import { UserContext } from "../../App";

const GreetUser = () => {
  const user = useContext(UserContext);
  return user ? (
    <span className="greeting">Hello, {user?.username}</span>
  ) : (
    <></>
  );
};

export default GreetUser;
