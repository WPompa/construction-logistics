import styles from "./css/Materials.module.css";
import "./css/views.css";
import NoMaterialImg from "../../../assets/NoMaterialImg.png";
import TopBottom from "../../minor-components/TopBottom";

const Materials = ({
  MaterialID,
  Name,
  MaterialType,
  Length,
  Width,
  Height,
  SupplierName,
  TotalAvailable,
  LostAmounts,
  img = NoMaterialImg,
}) => {
  return (
    <div className={` views-common ${styles["materials-container"]}`}>
      <div className={`grid-item item-img-id ${styles["item-img-id"]}`}>
        <div className="data-img-container">
          <img
            className="data-img"
            src={img}
            alt={`Material ${MaterialID} image`}
          />
        </div>

        <p className="data-id">ID: {MaterialID}</p>
      </div>

      <div className={`grid-item ${styles["item-divider"]}`}>
        <div className="divider"></div>
      </div>

      <div className={`grid-item ${styles["item-name-supp"]}`}>
        <TopBottom top={Name} bottom={"BRAND"} altClass={"name"} />
        <TopBottom
          top={SupplierName}
          bottom={"SUPPLIER"}
          altClass={"supplierName"}
        />
      </div>

      <div className={`grid-item ${styles["item-type-l-w-h"]}`}>
        <TopBottom
          top={MaterialType}
          bottom={"MATERIAL TYPE"}
          altClass={"materialType"}
        />
        <TopBottom top={Length} bottom={"LENGTH"} altClass={"length"} />
        <TopBottom top={Width} bottom={"WIDTH"} altClass={"width"} />
        <TopBottom top={Height} bottom={"HEIGHT"} altClass={"height"} />
      </div>

      <div className={`grid-item ${styles["item-divider"]}`}>
        <div className="divider"></div>
      </div>

      <div className={`grid-item ${styles["item-avail-lost"]}`}>
        <TopBottom
          top={TotalAvailable}
          bottom={"AVAILABLE"}
          altClass={styles["totalAvailable"]}
        />
        <TopBottom
          top={LostAmounts}
          bottom={"TRASHED"}
          altClass={styles["LostAmounts"]}
        />
      </div>
    </div>
  );
};

export default Materials;
