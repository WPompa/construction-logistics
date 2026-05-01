import styles from "./css/StoredIn.module.css";
import "./css/views.css";
import TopBottom from "../../minor-components/TopBottom";
import NoStorageAreaImg from "../../../assets/NoStorageAreaImg.png";
import NoMaterialImg from "../../../assets/NoMaterialImg.png";

const StoredIn = ({
  StorageAreaID,
  Location,
  JobsiteID,
  JobsiteName,
  MaterialID,
  Name,
  MaterialType,
  Amount,
  imgSArea = NoStorageAreaImg,
  imgMat = NoMaterialImg,
}) => {
  return (
    <div className={`views-common ${styles["storedin-container"]}`}>
      <div className={`grid-item item-img-id ${styles["item-imgSArea"]}`}>
        <div className="data-img-container">
          <img
            className="data-img"
            src={imgSArea}
            alt={`StorageArea ${StorageAreaID} image`}
          />
        </div>
      </div>
      <div className={`grid-item ${styles["item-location-jobsite"]}`}>
        <TopBottom
          top={Location}
          bottom={"LOCATION"}
          altClass={styles["location"]}
          tooltip={StorageAreaID}
          tooltipTitle={"ID"}
        />

        <TopBottom
          top={JobsiteName}
          bottom={"JOBSITE"}
          altClass={styles["jobsite"]}
          tooltip={JobsiteID}
          tooltipTitle={"ID"}
        />
      </div>

      <div className={`grid-item ${styles["item-divider"]}`}>
        <div className="divider"></div>
      </div>

      <div className={`grid-item item-img-id ${styles["item-imgMat"]}`}>
        <div className="data-img-container">
          <img
            className="data-img"
            src={imgMat}
            alt={`Material ${MaterialID} image`}
          />
        </div>
      </div>

      <div className={`grid-item ${styles["item-name-type"]}`}>
        <TopBottom
          top={Name}
          bottom={"BRAND"}
          altClass={styles["name"]}
          tooltip={MaterialID}
          tooltipTitle={"ID"}
        />

        <TopBottom
          top={MaterialType}
          bottom={"TYPE"}
          altClass={styles["type"]}
        />
      </div>

      <div className={`grid-item ${styles["item-divider"]}`}>
        <div className="divider"></div>
      </div>

      <div className={`grid-item ${styles["item-amount"]}`}>
        <TopBottom top={Amount} bottom={"STOCK"} altClass={styles["amount"]} />
      </div>
    </div>
  );
};

export default StoredIn;
