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
    const fallback = Math.random();

    switch (tableToDisplay) {
      case "employees":
        return `employees-${rowData.EmpID || fallback}`;
      case "leadership":
        return `leadership-${rowData.EmpID || fallback}`;
      case "materials":
        return `materials-${rowData.MaterialID || fallback}`;
      case "jobsites":
        return `jobsites-${rowData.JobsiteID || fallback}`;
      case "storageareas":
        return `storageareas-${rowData.StorageAreaID || fallback}`;
      case "storedin":
        return `${rowData.StorageAreaID || fallback}-${rowData.JobsiteID || fallback}-${rowData.MaterialID || fallback}`;
      default:
        throw new Error("No Obtainable Row ID!");
    }
  };

  if (!tableToDisplay) {
    return (
      <div className="display-message">
        <p>No table selected</p>
      </div>
    );
  }

  const CurrentView = viewMap[tableToDisplay];
  //Add toast if some how viewMap returns undefined?

  if (CurrentView && data.status == "Success!") {
    if (data.result.length === 0) {
      return (
        <div className="display-message">
          <p>No records found for {tableToDisplay}.</p>
        </div>
      );
    }

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
