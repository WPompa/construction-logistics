import styles from "./css/Employees.module.css";
import "./css/views.css";
import NoPersonalImg from "../../../assets/NoPersonalImg.png";
import TopBottom from "../../minor-components/TopBottom";

const Employees = ({
  EmpID = -1,
  Fname = "",
  Lname = "",
  Title = "",
  Supervisor = "",
  SupervisorID = -1,
  JobsiteName = "",
  JobsiteID = -1,
  img = NoPersonalImg,
}) => {
  return (
    <div className={`views-common ${styles["employees-container"]}`}>
      <div className={`grid-item item-img-id ${styles["item-img-id"]}`}>
        <div className="data-img-container">
          <img className="data-img" src={img} alt={`Employee ${EmpID} image`} />
        </div>

        <p className="data-id">ID: {EmpID}</p>
      </div>

      <div className={`grid-item ${styles["item-divider"]}`}>
        <div className="divider"></div>
      </div>

      <div className={`grid-item ${styles["item-name"]}`}>
        <TopBottom
          top={Fname + " " + Lname}
          bottom={"NAME"}
          altClass={styles["name"]}
        />
      </div>

      <div className={`grid-item ${styles["item-title"]}`}>
        <TopBottom top={Title} bottom={"TITLE"} altClass={styles["title"]} />
      </div>

      <div className={`grid-item ${styles["item-jobsite"]}`}>
        <TopBottom
          top={JobsiteName}
          bottom={"JOBSITE"}
          altClass={styles["jobsite"]}
          tooltip={JobsiteID}
          tooltipTitle={"ID"}
        />
      </div>

      <div className={`grid-item ${styles["item-supervisor"]}`}>
        <TopBottom
          top={Supervisor}
          bottom={"SUPERVISOR"}
          altClass={styles["supervisor"]}
          tooltip={SupervisorID}
          tooltipTitle={"ID"}
        />
      </div>
    </div>
  );
};

export default Employees;
