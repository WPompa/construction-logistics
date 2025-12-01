import { useState, useContext } from "react";
import FormButtons from "./FormButtons";
import SelectTableOptions from "./SelectTableOptions";
import { DashboardContext } from "../../pages/Dashboard";
import { formInputValues as v } from "./controlledInputsData";

const DeleteForms = () => {
  const [deleteBody, setDeleteBody] = useState({});
  const [chosenTable, setChosenTable] = useState("");
  const { deleteMethod } = useContext(DashboardContext);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDeleteBody({ ...deleteBody, [name]: value });
  };

  const isDeleteBodyEmpty = () => {
    return Object.keys(deleteBody).length === 0;
  };

  const displayTableInputs = () => {
    switch (chosenTable) {
      case "employees":
        if (isDeleteBodyEmpty()) {
          setDeleteBody(v.employees);
        }
        return (
          <>
            <label className="label-main">
              Emp ID:
              <input
                type="text"
                name="EmpID"
                placeholder="ex. 123, 456, ..., ..."
                value={deleteBody.EmpID}
                onChange={handleChange}
              />
            </label>
            <label className="label-main">
              First name:
              <input
                type="text"
                name="Fname"
                placeholder="john, ..., ..."
                value={deleteBody.Fname}
                onChange={handleChange}
              />
            </label>
            <label className="label-main">
              Last name:
              <input
                type="text"
                name="Lname"
                placeholder="doe, ..., ..."
                value={deleteBody.Lname}
                onChange={handleChange}
              />
            </label>
            <label className="label-main">
              Job Title:
              <input
                type="text"
                name="Title"
                placeholder="journeyman, ..., ..."
                value={deleteBody.Title}
                onChange={handleChange}
              />
            </label>
            <label className="label-main">
              Supervisor ID:
              <input
                type="text"
                name="SupervisorID"
                placeholder="ex. 123, 456, ..., ..."
                value={deleteBody.SupervisorID}
                onChange={handleChange}
              />
            </label>
            <label className="label-main">
              Jobsite ID:
              <input
                type="text"
                name="JobsiteID"
                placeholder="ex. 123, 456, ..., ..."
                value={deleteBody.JobsiteID}
                onChange={handleChange}
              />
            </label>
          </>
        );
      case "materials":
        if (isDeleteBodyEmpty()) {
          setDeleteBody(v.material);
        }
        return (
          <>
            <label className="label-main">
              Material ID:
              <input
                type="text"
                name="MaterialID"
                placeholder="ex. 123, 456, ..., ..."
                value={deleteBody.MaterialID}
                onChange={handleChange}
              />
            </label>
            <label className="label-main">
              Name:
              <input
                type="text"
                name="Name"
                placeholder="brand name 123, ..., ..."
                value={deleteBody.Name}
                onChange={handleChange}
              />
            </label>
            <label className="label-main">
              Material Type:
              <input
                type="text"
                name="MaterialType"
                placeholder="insulation, tape, ..."
                value={deleteBody.MaterialType}
                onChange={handleChange}
              />
            </label>
            <label className="label-main">
              Box Length:
              <input
                type="text"
                name="Length"
                placeholder="length inches, ..., ..."
                value={deleteBody.Length}
                onChange={handleChange}
              />
            </label>
            <label className="label-main">
              Box Width:
              <input
                type="text"
                name="Width"
                placeholder="width inches, ..., ..."
                value={deleteBody.Width}
                onChange={handleChange}
              />
            </label>
            <label className="label-main">
              Box Height:
              <input
                type="text"
                name="Height"
                placeholder="height inches, ..., ..."
                value={deleteBody.Height}
                onChange={handleChange}
              />
            </label>
            <label className="label-main">
              Supplier Name:
              <input
                type="text"
                name="SupplierName"
                placeholder="acme inc., ..., ..."
                value={deleteBody.SupplierName}
                onChange={handleChange}
              />
            </label>
            <label className="label-main">
              Available:
              <input
                type="text"
                name="TotalAvailable"
                placeholder="total available, ..., ..."
                value={deleteBody.TotalAvailable}
                onChange={handleChange}
              />
            </label>
            <label className="label-main">
              Lost:
              <input
                type="text"
                name="LostAmounts"
                placeholder="total lost, ..., ..."
                value={deleteBody.LostAmounts}
                onChange={handleChange}
              />
            </label>
          </>
        );
      case "stored_in":
        if (isDeleteBodyEmpty()) {
          setDeleteBody(v.stored_in);
        }
        return (
          <>
            <label className="label-main">
              Storage Area ID:
              <input
                type="text"
                name="StorageAreaID"
                placeholder="ex. 123, 456, ..., ..."
                value={deleteBody.StorageAreaID}
                onChange={handleChange}
              />
            </label>
            <label className="label-main">
              Material ID:
              <input
                type="text"
                name="MaterialID"
                placeholder="ex. 123, 456, ..., ..."
                value={deleteBody.MaterialID}
                onChange={handleChange}
              />
            </label>
            <label className="label-main">
              Amount:
              <input
                type="text"
                name="Amount"
                placeholder="ex. 10, ..., ..."
                value={deleteBody.Amount}
                onChange={handleChange}
              />
            </label>
          </>
        );
      case "storage_areas":
        if (isDeleteBodyEmpty()) {
          setDeleteBody(v.storage_area);
        }
        return (
          <>
            <label className="label-main">
              Storage Area ID:
              <input
                type="text"
                name="StorageAreaID"
                placeholder="ex. 123, 456, ..., ..."
                value={deleteBody.StorageAreaID}
                onChange={handleChange}
              />
            </label>
            <label className="label-main">
              Inner Length:
              <input
                type="text"
                name="Length"
                placeholder="length feet, ..., ..."
                value={deleteBody.Length}
                onChange={handleChange}
              />
            </label>
            <label className="label-main">
              Inner Width:
              <input
                type="text"
                name="Width"
                placeholder="width feet, ..., ..."
                value={deleteBody.Width}
                onChange={handleChange}
              />
            </label>
            <label className="label-main">
              Inner Height:
              <input
                type="text"
                name="Height"
                placeholder="height feet, ..., ..."
                value={deleteBody.Height}
                onChange={handleChange}
              />
            </label>
            <label className="label-main">
              Location:
              <input
                type="text"
                name="Location"
                placeholder="laydown 123, ..., ..."
                value={deleteBody.Location}
                onChange={handleChange}
              />
            </label>
            <label className="label-main">
              Jobsite ID:
              <input
                type="text"
                name="JobsiteID"
                placeholder="ex. 123, 456, ..., ..."
                value={deleteBody.JobsiteID}
                onChange={handleChange}
              />
            </label>
            <label className="label-main">
              Total Stored:
              <input
                type="text"
                name="TotalStored"
                placeholder="ex. 10, ..., ..."
                value={deleteBody.TotalStored}
                onChange={handleChange}
              />
            </label>
            <label className="label-main">
              Is Container?:
              <input
                type="text"
                name="Is_Container"
                placeholder="yes, no"
                value={deleteBody.Is_Container}
                onChange={handleChange}
              />
            </label>
          </>
        );
      case "jobsites":
        if (isDeleteBodyEmpty()) {
          setDeleteBody(v.jobsite);
        }
        return (
          <>
            <label className="label-main">
              Jobsite ID:
              <input
                type="text"
                name="JobsiteID"
                placeholder="ex. 123, 456, ..., ..."
                value={deleteBody.JobsiteID}
                onChange={handleChange}
              />
            </label>
            <label className="label-main">
              Jobsite Name:
              <input
                type="text"
                name="JobsiteName"
                placeholder="abc data center, ..., ..."
                value={deleteBody.JobsiteName}
                onChange={handleChange}
              />
            </label>
            {/* <label className="label-main">
              Supervisor ID:
              <input
                type="text"
                name="JobsiteSupervisorID"
                placeholder="ex. 123, 456, ..., ..."
                value={deleteBody.JobsiteSupervisorID}
                onChange={handleChange}
              />
            </label> */}
          </>
        );
      /* case "activity_log":
        if (isDeleteBodyEmpty()) {
          setDeleteBody(v.activity_log);
        }
        return (
          <>
            <label className="label-main">
              Activity ID:
              <input
                type="text"
                name="ActivityID"
                placeholder="ex. 123, 456"
                value={deleteBody.ActivityID}
                onChange={handleChange}
              />
            </label>
            <label className="label-main">
              Emp ID:
              <input
                type="text"
                name="EmpID"
                placeholder="ex. 123, 456"
                value={deleteBody.EmpID}
                onChange={handleChange}
              />
            </label>
            <label className="label-main">
              Action:
              <input
                type="text"
                name="Action"
                placeholder="add description of task"
                value={deleteBody.Action}
                onChange={handleChange}
              />
            </label>
            <label className="label-main">
              Jobsite ID:
              <input
                type="text"
                name="JobsiteID"
                placeholder="ex. 123, 456"
                value={deleteBody.JobsiteID}
                onChange={handleChange}
              />
            </label>
            <label className="label-main">
              Time-stamp:
              <input
                type="text"
                name="TimeDone"
                placeholder="yyyy-mm-dd 24:60:00"
                value={deleteBody.TimeDone}
                onChange={handleChange}
              />
            </label>
          </>
        ); */
      default:
        return <></>;
    }
  };

  return (
    <>
      <SelectTableOptions
        setChosenTable={setChosenTable}
        setHTTPBody={setDeleteBody}
      />
      <div className="dashboard-form-info">
        <span>Multiple inputs accepted.</span>
      </div>
      <form className="dashboard-form">
        <fieldset>{displayTableInputs()}</fieldset>

        <FormButtons
          setChosenTable={setChosenTable}
          chosenTable={chosenTable}
          setHTTPBody={setDeleteBody}
          httpBody={deleteBody}
          httpMethod={deleteMethod}
        />
      </form>
    </>
  );
};

export default DeleteForms;
