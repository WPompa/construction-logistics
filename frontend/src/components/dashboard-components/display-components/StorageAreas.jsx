import styles from "./css/StorageAreas.module.css";
import "./css/views.css";
import NoStorageAreaImg from "../../../assets/NoStorageAreaImg.png";
import TopBottom from "../../minor-components/TopBottom";

const StorageAreas = ({
  StorageAreaID,
  Location,
  JobsiteName,
  JobsiteID,
  Length,
  Width,
  Height,
  TotalStored,
  is_Container,
  img = NoStorageAreaImg,
}) => {
  return (
    <div className={` views-common ${styles["storageareas-container"]}`}>
      <div className={`grid-item item-img-id ${styles["item-img-id"]}`}>
        <div className="data-img-container">
          <img
            className="data-img"
            src={img}
            alt={`StorageArea ${StorageAreaID} image`}
          />
        </div>

        <p className="data-id">ID: {StorageAreaID}</p>
      </div>

      <div className={`grid-item ${styles["item-divider"]}`}>
        <div className="divider"></div>
      </div>

      <div className={`grid-item ${styles["item-location-jobsite-container"]}`}>
        <TopBottom top={Location} bottom={"LOCATION"} altClass={"Location"} />
        <TopBottom
          top={JobsiteName}
          bottom={"JOBSITE"}
          altClass={"jobsite"}
          tooltip={JobsiteID}
          tooltipTitle={"ID"}
        />
        <TopBottom
          top={is_Container ? "YES" : "NO"}
          bottom={"CONTAINER?"}
          altClass={"container"}
        />
      </div>

      <div className={`grid-item ${styles["item-l-w-h"]}`}>
        <TopBottom top={Length} bottom={"LENGTH"} altClass={"length"} />
        <TopBottom top={Width} bottom={"WIDTH"} altClass={"width"} />
        <TopBottom top={Height} bottom={"HEIGHT"} altClass={"height"} />
      </div>

      <div className={`grid-item ${styles["item-divider"]}`}>
        <div className="divider"></div>
      </div>

      <div className={`grid-item ${styles["item-stored"]}`}>
        <TopBottom
          top={TotalStored}
          bottom={"Stored Units"}
          altClass={styles["total-stored"]}
        />
      </div>
    </div>
  );
};

export default StorageAreas;
