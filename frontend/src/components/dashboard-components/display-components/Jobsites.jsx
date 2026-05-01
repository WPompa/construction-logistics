import styles from "./css/Jobsites.module.css";
import "./css/views.css";
import NoJobsiteImg from "../../../assets/NoJobsiteImg.png";
import TopBottom from "../../minor-components/TopBottom";

const Jobsites = ({
  JobsiteID,
  Jobsite,
  Supervisor,
  SupervisorID,
  img = NoJobsiteImg,
}) => {
  return (
    <div className={`views-common ${styles["jobsites-container"]}`}>
      <div className={`grid-item item-img-id ${styles["item-img-id"]}`}>
        <div className="data-img-container">
          <img
            className="data-img"
            src={img}
            alt={`Jobsite ${JobsiteID} image`}
          />
        </div>

        <p className="data-id">ID: {JobsiteID}</p>
      </div>

      <div className={`grid-item ${styles["item-divider"]}`}>
        <div className="divider"></div>
      </div>

      <div className={`grid-item ${styles["item-jobsite-super"]}`}>
        <TopBottom
          top={Jobsite}
          bottom={"JOBSITE"}
          altClass={styles["jobsite-name"]}
        />

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

export default Jobsites;
