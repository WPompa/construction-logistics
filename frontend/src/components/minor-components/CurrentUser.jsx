import { useContext } from "react";
import { UserContext } from "../../App";
import "./css/current-user.css";

const CurrentUser = () => {
  const { user, setUser } = useContext(UserContext);

  return user ? (
    <span className="currentUser">
      {user?.username}
      <button
        className="logout-btn"
        onClick={() => {
          setUser(null);
          localStorage.removeItem("token");
        }}
      >
        Logout
      </button>
    </span>
  ) : (
    <></>
  );
};

export default CurrentUser;
