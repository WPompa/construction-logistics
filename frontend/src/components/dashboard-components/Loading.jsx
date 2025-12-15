import cog from "../../assets/SVG/cog.svg";
import "../../pages/css/login.css";
import "./css/loading.css";

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="login-image">
        <img src={cog} alt="cog" className="logo" />
      </div>
    </div>
  );
};

export default Loading;
