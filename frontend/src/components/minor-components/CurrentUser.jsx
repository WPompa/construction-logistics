import { useContext } from "react";
import { UserContext } from "../../App";
import "./css/current-user.css";

const CurrentUser = () => {
  const { user, setUser } = useContext(UserContext);

  return user ? (
    <div className="currentUser">
      <button
        className="logout-btn"
        onClick={() => {
          setUser(null);
          localStorage.removeItem("token");
        }}
      >
        Logout
      </button>

      <span className="username">{user?.username}</span>
    </div>
  ) : (
    <></>
  );
};

export default CurrentUser;
