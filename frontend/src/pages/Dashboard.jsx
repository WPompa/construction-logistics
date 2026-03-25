import React, { useState, useEffect, useRef } from "react";
import DisplayData from "../components/dashboard-components/DisplayData";
import PostForms from "../components/dashboard-components/PostForms";
import PutForms from "../components/dashboard-components/PutForms";
import DeleteForms from "../components/dashboard-components/DeleteForms";
import "./css/dashboard.css";
import CurrentPage from "../components/minor-components/CurrentPage";
import CurrentLimit from "../components/minor-components/CurrentLimit";
import ErrorModal from "../components/minor-components/ErrorModal";
import Loading from "../components/dashboard-components/Loading";

export const DashboardContext = React.createContext();

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [tableToDisplay, setTableToDisplay] = useState("");
  const [reload, setReload] = useState(false);
  const [methodOption, setMethodOption] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", body: "" });
  const [isLoading, setIsLoading] = useState(false);
  let backgroundDivRef = useRef(false);
  let table = useRef("");
  let page = useRef(1);
  let limit = useRef(10);

  const params = new URLSearchParams();
  params.set("table", tableToDisplay);
  params.set("page", page.current);
  params.set("limit", limit.current);

  const API_URL = new URL(import.meta.env.VITE_API_URL);

  /////////////////////////////////////////////
  const DBTableNames = {
    Employees: "employees",
    Materials: "materials",
    "Stored In": "storedin",
    "Storage Areas": "storageareas",
    Jobsites: "jobsites",
    Leadership: "leadership",
    "Emp + Jobsites": "emp + jobsites",
    "Mat. Amounts": "mat. amounts",
    // "Activity Log": "activity_log",
  };
  /////////////////////////////////////////////

  useEffect(() => {
    if (tableToDisplay) {
      getData(table.current);
      console.log("getData()");
    } else {
      console.log("No table for getData()");
    }
  }, [tableToDisplay, reload]);

  /////////////////////////////////////////////

  const getData = (table) => {
    setIsLoading(true);
    const token = localStorage.getItem("token");

    const endpoint = new URL(table, API_URL);
    endpoint.search = params.toString();

    fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status !== "Success!") {
          throw data;
        }
        setData(data);
        console.log(data); //remove later.
        setIsLoading(false);
      })
      .catch((err) => {
        setModalContent({ title: err.status, body: err.message });
        setShowModal(true);
        setIsLoading(false);
        return console.log(err);
      }); //Eventually set error or its message to a variable and modal it or similar. Handle errors.
  };

  //Setting select to none does not remove rendered data from container.
  const changeDisplayedTable = (e) => {
    let newTableToDisplay = "";
    const other = ["leadership", "emp + jobsites", "mat. amounts"];

    if (e?.target.value) {
      backgroundDivRef.current = true;
      newTableToDisplay = e.target.value;
      table.current = e.target.value;
      params.set("table", "leadership");

      if (other.includes(newTableToDisplay)) {
        table.current = "other";
      }
    } else {
      backgroundDivRef.current = false;
    }
    tableToDisplay !== newTableToDisplay
      ? setTableToDisplay(newTableToDisplay)
      : {}; //Better approach would be to use if(), but this was just for my own curiosity.
  };

  const updateURLParams = (param, value) => {
    params.set(param, value);
    if (tableToDisplay) {
      setReload(!reload);
    }
  };

  const changePageValue = (value) => {
    page.current = page.current + value;

    if (page.current <= 0) {
      page.current = 1;
      return;
    }
    updateURLParams("page", page.current);
  };

  /* Probably need to rewrite for clarity. If data is being added, changed, or deleted and the table 
  that data belongs to is the active table in DisplayData then the table will be reloaded with the new 
  data. */
  const reloadDataContainer = (table) => {
    const dropdownValue = table;
    if (tableToDisplay === dropdownValue) {
      setReload(!reload);
    }
  };

  const httpFetchRequest = (body, table, method, useEmpty) => {
    const token = localStorage.getItem("token");

    const endpoint = new URL(table, API_URL);

    fetch(endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(useEmpty ? { body, table, useEmpty } : { body }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status !== "Success!") {
          throw data;
        }
        reloadDataContainer(table);
        return console.log(data);
      })
      .catch((err) => {
        setShowModal(true);
        setModalContent({ title: err.status, body: err.message });
        return console.log(err);
      });
  };

  //////////////////////////////////////////////////////////////////////////////////////////
  //Could probably place each method type within relevant sub-components (i.e <postForms />).
  //These individual methods will be removed.
  const postMethod = (postBody, table) => {
    httpFetchRequest(postBody, table, "POST");
  };

  const deleteMethod = (deleteBody, table) => {
    httpFetchRequest(deleteBody, table, "DELETE");
  };

  const putMethod = (putBody, table, useEmpty) => {
    httpFetchRequest(putBody, table, "PUT", useEmpty);
  };

  //////////////////////////////////////////////////////////////////////////////////////////
  function displayQueryOptions() {
    switch (methodOption) {
      case "post":
        return (
          <div className="dashboard-form-container">
            <PostForms />
          </div>
        );

      case "put":
        return (
          <div className="dashboard-form-container">
            <PutForms />
          </div>
        );

      case "delete":
        return (
          <div className="dashboard-form-container">
            <DeleteForms />
          </div>
        );
      default:
        return displayQueryButtons();
    }
  }

  function displayQueryButtons() {
    return (
      <div className="dashboard-btn-container">
        <button
          type="button"
          className="dashboard-btn add-btn"
          onClick={() => setMethodOption("post")}
        >
          Add
        </button>

        <button
          type="button"
          className="dashboard-btn change-btn"
          onClick={() => setMethodOption("put")}
        >
          Change
        </button>

        <button
          type="button"
          className="dashboard-btn delete-btn"
          onClick={() => setMethodOption("delete")}
        >
          Delete
        </button>

        <button
          type="button"
          className="dashboard-btn"
          id="reload-btn"
          onClick={() => setReload(!reload)}
        >
          Reload
        </button>
      </div>
    );
  }

  return (
    <DashboardContext.Provider
      value={{
        setMethodOption,
        postMethod,
        putMethod,
        deleteMethod,
      }}
    >
      <div className="dashboard-container">
        {showModal && (
          <ErrorModal
            setShowModal={setShowModal}
            title={modalContent.title}
            body={modalContent.body}
          />
        )}
        <div className="select-container dashboard-item">
          <button
            type="button"
            className="select-container-btn"
            onClick={() =>
              confirm("Reset options and delete user queries? (future feature)")
            }
          >
            Reset Queries
          </button>

          <div className="select-table">
            <label htmlFor="tables">Select a Table: </label>
            <select name="tables" id="tables" onChange={changeDisplayedTable}>
              <option value="">None</option>
              {Object.keys(DBTableNames).map((tableName) => (
                <option key={tableName} value={DBTableNames[tableName]}>
                  {tableName}
                </option>
              ))}
            </select>
          </div>

          <CurrentPage value={page} function={updateURLParams} />

          <CurrentLimit value={limit} function={updateURLParams} />
        </div>

        <div className="dashboard-item dashboard-data-container">
          <div className={backgroundDivRef.current ? "background-div" : ""}>
            {isLoading ? (
              <Loading />
            ) : (
              <DisplayData tableToDisplay={tableToDisplay} data={data} />
            )}
          </div>
        </div>

        <div className="dashboard-item dashboard-input-container">
          <button
            type="button"
            className="page-btn"
            onClick={() => {
              changePageValue(-1);
            }}
          >
            &lt;
          </button>

          {displayQueryOptions()}

          <button
            type="button"
            className="page-btn"
            onClick={() => {
              changePageValue(1);
            }}
          >
            &gt;
          </button>
        </div>
      </div>
    </DashboardContext.Provider>
  );
};

export default Dashboard;
