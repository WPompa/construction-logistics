import React, { useState, useEffect, useRef } from "react";
import DisplayData from "../components/dashboard-components/DisplayData";
import PostForms from "../components/dashboard-components/PostForms";
import PutForms from "../components/dashboard-components/PutForms";
import DeleteForms from "../components/dashboard-components/DeleteForms";
import "./css/dashboard.css";
import CurrentPage from "../components/minor-components/CurrentPage";
import CurrentLimit from "../components/minor-components/CurrentLimit";
import ErrorModal from "../components/minor-components/ErrorModal";

export const DashboardContext = React.createContext();

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [tableUrl, setTableUrl] = useState("");
  const [reload, setReload] = useState(false);
  const [methodOption, setMethodOption] = useState("");
  const [showModal, setShowModal] = useState(false);
  let backgroundDivRef = useRef(false);
  let table = useRef("");
  let page = useRef(1);
  let limit = useRef(10);

  const params = new URLSearchParams();
  params.set("table", table.current);
  params.set("page", page.current);
  params.set("limit", limit.current);

  const TABLE_DATA_URL = new URL(import.meta.env.VITE_TABLE_DATA_URL);
  const API_URL = new URL(import.meta.env.VITE_API_URL);

  /////////////////////////////////////////////
  const dbTableNames = {
    Employees: "employees",
    Materials: "materials",
    "Stored In": "stored_in",
    "Storage Areas": "storage_areas",
    Jobsites: "jobsites",
    Leadership: "leadership",
    "Emp + Jobsites": "emp + jobsites",
    "Mat. Amounts": "mat. amounts",
    // "Activity Log": "activity_log",
  };
  /////////////////////////////////////////////

  useEffect(() => {
    if (tableUrl) {
      getData();
      console.log("getData()");
    } else {
      console.log("No URL for getData()");
    }
  }, [tableUrl, reload]);

  const getData = () => {
    fetch(tableUrl)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log(data); //remove later.
      })
      .catch((err) => {
        setShowModal(true);
        return console.log(err);
      }); //Eventually set error or its message to a variable and modal it or similar. Handle errors.
  };

  //Setting select to none does not remove rendered data from container.
  const changeUrl = (e) => {
    let newUrl = "";

    if (e?.target.value) {
      backgroundDivRef.current = true;
      table.current = e.target.value;
      params.set("table", table.current);
      newUrl = TABLE_DATA_URL.toString() + params.toString();
    } else {
      backgroundDivRef.current = false;
    }
    tableUrl !== newUrl ? setTableUrl(newUrl) : {}; //Better approach would be to use if(), but this was just for my own curiosity.
  };

  const updateURLParams = (param, value) => {
    params.set(param, value);
    if (tableUrl) {
      setTableUrl(TABLE_DATA_URL.toString() + params.toString());
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
    //...url.../get?table=`someTableName`
    const dataContainerDropdownValue = tableUrl.substring(
      tableUrl.lastIndexOf("=") + 1
    );
    if (table === dataContainerDropdownValue) {
      setReload(!reload);
    }
  };

  //////////////////////////////////////////////////////////////////////////////////////////
  //The .catch(err) should let users know they messed up something. Modal or other option?
  //Am I missing more info for the headers or something else?
  //Could probably place each method type within relevant sub-components (i.e <postForms />).

  const postMethod = (postBody, table) => {
    console.log("post()");
    console.log(JSON.stringify({ postBody, table }));

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postBody, table }),
    })
      .then((response) => response.json())
      .then((data) => {
        reloadDataContainer(table);
        return console.log(data);
      })
      .catch((err) => {
        setShowModal(true);
        return console.log(err);
      });
  };

  const deleteMethod = (deleteBody, table) => {
    console.log("delete()");
    console.log(deleteBody);

    fetch(API_URL, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ deleteBody, table }),
    })
      .then((response) => response.json())
      .then((data) => {
        reloadDataContainer(table);
        return console.log(data);
      })
      .catch((err) => {
        setShowModal(true);
        return console.log(err);
      });
  };

  const putMethod = (putBody, table, useEmpty) => {
    console.log("put()");
    console.log(JSON.stringify({ putBody, table, useEmpty }));

    fetch(API_URL, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ putBody, table, useEmpty }),
    })
      .then((response) => response.json())
      .then((data) => {
        reloadDataContainer(table);
        return console.log(data);
      })
      .catch((err) => {
        setShowModal(true);
        return console.log(err);
      });
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
        {showModal && <ErrorModal setShowModal={setShowModal} />}
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
            <select name="tables" id="tables" onChange={changeUrl}>
              <option value="">None</option>
              {Object.keys(dbTableNames).map((tableName) => (
                <option key={tableName} value={dbTableNames[tableName]}>
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
            {<DisplayData tableUrl={tableUrl} data={data} />}
          </div>
        </div>

        <div className="dashboard-item dashboard-input-container">
          <button
            className="page-btn"
            onClick={() => {
              changePageValue(-1);
            }}
          >
            &lt;
          </button>

          {displayQueryOptions()}

          <button
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
