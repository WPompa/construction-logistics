import React, { useState, useEffect } from "react";
import RenderData from "../components/dashboard-components/RenderData";
import PostForms from "../components/dashboard-components/PostForms";
import PutForms from "../components/dashboard-components/PutForms";
import DeleteForms from "../components/dashboard-components/DeleteForms";
import "./css/dashboard.css";

export const DashboardContext = React.createContext();

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [tableUrl, setTableUrl] = useState("");
  const [reload, setReload] = useState(false);
  const [methodOption, setMethodOption] = useState("");

  const params = new URLSearchParams();

  let url = import.meta.env.VITE_TABLE_QUERY_URL;
  const httpURL = import.meta.env.VITE_HTTP_URL;

  /////////////////////////////////////////////
  const dbTableNames = {
    Employees: "employees",
    Materials: "materials",
    "Stored In": "stored_in",
    "Storage Areas": "storage_areas",
    Jobsites: "jobsites",
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
      .catch((err) => console.log(err)); //Eventually set error or its message to a variable and modal it or similar. Handle errors.
  };

  const changeUrl = (e) => {
    let newUrl = "";

    if (e.target.value) {
      params.set("table", e.target.value);
      newUrl = url + params;
    }
    tableUrl !== newUrl ? setTableUrl(newUrl) : {}; //Better approach would be to use if(), but this was just for my own curiosity.
  };

  /* Probably need to rewrite for clarity. If data is being added, changed, or deleted and the table 
  that data belongs to is the active table in RenderData then the table will be reloaded with the new 
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

    fetch(httpURL, {
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
        alert("Error! Check console for more info.");
        return console.log(err);
      });
  };

  const deleteMethod = (deleteBody, table) => {
    console.log("delete()");
    console.log(deleteBody);

    fetch(httpURL, {
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
        alert("Error! Check console for more info.");
        return console.log(err);
      });
  };

  const putMethod = (putBody, table, useEmpty) => {
    console.log("put()");
    console.log(JSON.stringify({ putBody, table, useEmpty }));

    fetch(httpURL, {
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
        alert("Error! Check console for more info.");
        return console.log(err);
      });
  };

  //////////////////////////////////////////////////////////////////////////////////////////
  function displayQueryOptions() {
    switch (methodOption) {
      case "post":
        return <PostForms />;

      case "put":
        return <PutForms />;

      case "delete":
        return <DeleteForms />;
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
        <div className="select-table-container">
          <label htmlFor="tables">Select a Table: </label>
          <select name="tables" id="tables" onChange={changeUrl}>
            <option value="">None</option>
            {Object.keys(dbTableNames).map((tableName) => (
              <option key={tableName} value={dbTableNames[tableName]}>
                {tableName}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={() =>
              confirm("Reset options and delete user queries? (future feature)")
            }
          >
            Reset Queries
          </button>
        </div>

        <div className="dashboard-item dashboard-data-container">
          {<RenderData tableUrl={tableUrl} data={data} />}
        </div>

        <div className="dashboard-item dashboard-input-container">
          {displayQueryOptions()}
        </div>
      </div>
    </DashboardContext.Provider>
  );
};

export default Dashboard;
