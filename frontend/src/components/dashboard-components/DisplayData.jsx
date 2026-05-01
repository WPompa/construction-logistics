//
import Employees from "./display-components/Employees";
import Jobsites from "./display-components/Jobsites";
import StorageAreas from "./display-components/StorageAreas";
import Materials from "./display-components/Materials";
import StoredIn from "./display-components/StoredIn";
import Leadership from "./display-components/Leadership";

const viewMap = {
  employees: Employees,
  leadership: Leadership,
  materials: Materials,
  jobsites: Jobsites,
  storageareas: StorageAreas,
  storedin: StoredIn,
};

const DisplayData = ({ tableToDisplay, data }) => {
  const getID = (rowData) => {
    switch (tableToDisplay) {
      case "employees":
        return rowData.EmpID;
      case "leadership":
        return rowData.EmpID;
      case "materials":
        return rowData.MaterialID;
      case "jobsites":
        return rowData.JobsiteID;
      case "storageareas":
        return rowData.StorageAreaID;
      case "storedin":
        return `${rowData.StorageAreaID} ${rowData.JobsiteID}`;
      default:
        throw new Error("No Obtainable Row ID!");
    }
  };

  if (!tableToDisplay || !data) {
    return <></>;
  }

  const CurrentView = viewMap[tableToDisplay];
  //Add toast if some how viewMap returns undefined?

  if (CurrentView && data.result && data.status == "Success!") {
    return (
      <>
        {data.result.map((rowData) => {
          return <CurrentView key={getID(rowData)} {...rowData} />;
        })}
      </>
    );
  }
};

export default DisplayData;
