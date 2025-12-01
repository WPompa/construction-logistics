import { useState, useContext } from "react";
import FormButtons from "./FormButtons";
import SelectTableOptions from "./SelectTableOptions";
import { DashboardContext } from "../../pages/Dashboard"; //Maybe not needed.
import {
  formInputValues as v,
  formInputBooleans as b,
} from "./controlledInputsData";

const PutForms = () => {
  const [putBody, setPutBody] = useState({});
  const [useEmpty, setUseEmpty] = useState({});
  const [chosenTable, setChosenTable] = useState("");
  const { putMethod } = useContext(DashboardContext);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPutBody({ ...putBody, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const name = e.target.name;
    const checked = e.target.checked;
    setUseEmpty({ ...useEmpty, [name]: checked });
  };

  const isPutBodyEmpty = () => {
    return Object.keys(putBody).length === 0;
  };

  const displayTableInputs = () => {
    switch (chosenTable) {
      case "employees":
        if (isPutBodyEmpty()) {
          setPutBody(v.employees);
        }
        return (
          <>
            <label className="label-main">
              Emp ID(s):
              <input
                type="text"
                name="EmpID"
                placeholder="ex. 123, 456"
                value={putBody.EmpID}
                onChange={handleChange}
              />
              *
            </label>
            <label className="label-main">
              First name:
              <input
                type="text"
                name="Fname"
                placeholder="john"
                value={putBody.Fname}
                onChange={handleChange}
              />
            </label>
            <label className="label-main">
              Last name:
              <input
                type="text"
                name="Lname"
                placeholder="doe"
                value={putBody.Lname}
                onChange={handleChange}
              />
            </label>
            <label className="label-main">
              Job Title:
              <input
                type="text"
                name="Title"
                placeholder="journeyman"
                value={putBody.Title}
                onChange={handleChange}
              />
            </label>
            <label className="label-main">
              Supervisor ID:
              <input
                type="text"
                name="SupervisorID"
                placeholder="ex. 123"
                value={putBody.SupervisorID}
                onChange={handleChange}
              />
            </label>
            <label className="label-main">
              Jobsite ID:
              <input
                type="text"
                name="JobsiteID"
                placeholder="ex. 123"
                value={putBody.JobsiteID}
                onChange={handleChange}
              />
            </label>
          </>
        );
      case "materials":
        if (isPutBodyEmpty()) {
          setPutBody(v.material);
          setUseEmpty(b.material);
        }
        return (
          <>
            <label className="label-main">
              Material ID(s):
              <input
                type="text"
                name="MaterialID"
                placeholder="ex. 123, 456"
                value={putBody.MaterialID}
                onChange={handleChange}
              />
              *
            </label>
            <label className="label-main">
              Name:
              <input
                type="text"
                name="Name"
                placeholder="brand name 123"
                value={putBody.Name}
                onChange={handleChange}
              />
            </label>
            <label className="label-main">
              Material Type:
              <input
                type="text"
                name="MaterialType"
                placeholder="insulation, tape, ..."
                value={putBody.MaterialType}
                onChange={handleChange}
              />
            </label>
            <label className="label-main">
              Box Length:
              <input
                type="text"
                name="Length"
                placeholder="length inches"
                value={putBody.Length}
                onChange={handleChange}
              />
              <label className="label-checkbox">
                <input
                  type="checkbox"
                  name="Length"
                  checked={useEmpty.Length}
                  onChange={handleCheckboxChange}
                />
              </label>
            </label>
            <label className="label-main">
              Box Width:
              <input
                type="text"
                name="Width"
                placeholder="width inches"
                value={putBody.Width}
                onChange={handleChange}
              />
              <label className="label-checkbox">
                <input
                  type="checkbox"
                  name="Width"
                  checked={useEmpty.Width}
                  onChange={handleCheckboxChange}
                />
              </label>
            </label>
            <label className="label-main">
              Box Height:
              <input
                type="text"
                name="Height"
                placeholder="height inches"
                value={putBody.Height}
                onChange={handleChange}
              />
              <label className="label-checkbox">
                <input
                  type="checkbox"
                  name="Height"
                  checked={useEmpty.Height}
                  onChange={handleCheckboxChange}
                />
              </label>
            </label>
            <label className="label-main">
              Supplier Name:
              <input
                type="text"
                name="SupplierName"
                placeholder="acme inc."
                value={putBody.SupplierName}
                onChange={handleChange}
              />
            </label>
            <label className="label-main">
              Available:
              <input
                type="text"
                name="TotalAvailable"
                placeholder="total available"
                value={putBody.TotalAvailable}
                onChange={handleChange}
              />
            </label>
            <label className="label-main">
              Lost:
              <input
                type="text"
                name="LostAmounts"
                placeholder="total lost"
                value={putBody.LostAmounts}
                onChange={handleChange}
              />
            </label>
          </>
        );
      case "stored_in":
        if (isPutBodyEmpty()) {
          setPutBody(v.stored_in);
        }
        return (
          <>
            <label className="label-main">
              Storage Area ID(s):
              <input
                type="text"
                name="StorageAreaID"
                placeholder="ex. 123, 456"
                value={putBody.StorageAreaID}
                onChange={handleChange}
              />
              *
            </label>
            <label className="label-main">
              Material ID(s):
              <input
                type="text"
                name="MaterialID"
                placeholder="ex. 123, 456"
                value={putBody.MaterialID}
                onChange={handleChange}
              />
              *
            </label>
            <label className="label-main">
              Amount:
              <input
                type="text"
                name="Amount"
                placeholder="ex. 10"
                value={putBody.Amount}
                onChange={handleChange}
              />
            </label>
          </>
        );
      case "storage_areas":
        if (isPutBodyEmpty()) {
          setPutBody(v.storage_area);
          setUseEmpty(b.storage_area);
        }
        return (
          <>
            <label className="label-main">
              Storage Area ID(s):
              <input
                type="text"
                name="StorageAreaID"
                placeholder="ex. 123, 456"
                value={putBody.StorageAreaID}
                onChange={handleChange}
              />
              *
            </label>
            <label className="label-main">
              Inner Length:
              <input
                type="text"
                name="Length"
                placeholder="length feet"
                value={putBody.Length}
                onChange={handleChange}
              />
              <label className="label-checkbox">
                <input
                  type="checkbox"
                  name="Length"
                  checked={useEmpty.Length}
                  onChange={handleCheckboxChange}
                />
              </label>
            </label>
            <label className="label-main">
              Inner Width:
              <input
                type="text"
                name="Width"
                placeholder="width feet"
                value={putBody.Width}
                onChange={handleChange}
              />
              <label className="label-checkbox">
                <input
                  type="checkbox"
                  name="Width"
                  checked={useEmpty.Width}
                  onChange={handleCheckboxChange}
                />
              </label>
            </label>
            <label className="label-main">
              Inner Height:
              <input
                type="text"
                name="Height"
                placeholder="height feet"
                value={putBody.Height}
                onChange={handleChange}
              />
              <label className="label-checkbox">
                <input
                  type="checkbox"
                  name="Height"
                  checked={useEmpty.Height}
                  onChange={handleCheckboxChange}
                />
              </label>
            </label>
            <label className="label-main">
              Location:
              <input
                type="text"
                name="Location"
                placeholder="laydown 123"
                value={putBody.Location}
                onChange={handleChange}
              />
            </label>
            <label className="label-main">
              Jobsite ID(s):
              <input
                type="text"
                name="JobsiteID"
                placeholder="ex. 123, 456"
                value={putBody.JobsiteID}
                onChange={handleChange}
              />
            </label>
            <label className="label-main">
              Total Stored:
              <input
                type="text"
                name="TotalStored"
                placeholder="ex. 10"
                value={putBody.TotalStored}
                onChange={handleChange}
              />
            </label>
            <label className="label-main">
              Is Container?:
              <input
                type="text"
                name="Is_Container"
                placeholder="yes, no"
                value={putBody.Is_Container}
                onChange={handleChange}
              />
            </label>
          </>
        );
      case "jobsites":
        if (isPutBodyEmpty()) {
          setPutBody(v.jobsite);
          setUseEmpty(b.jobsite);
        }
        return (
          <>
            <label className="label-main">
              Jobsite ID(s):
              <input
                type="text"
                name="JobsiteID"
                placeholder="ex. 123"
                value={putBody.JobsiteID}
                onChange={handleChange}
              />
              *
            </label>
            <label className="label-main">
              Jobsite Name:
              <input
                type="text"
                name="JobsiteName"
                placeholder="abc data center"
                value={putBody.JobsiteName}
                onChange={handleChange}
              />
            </label>
            {/* <label className="label-main">
              Supervisor ID:
              <input
                type="text"
                name="JobsiteSupervisorID"
                placeholder="ex. 123"
                value={putBody.JobsiteSupervisorID}
                onChange={handleChange}
              />
              <label className="label-checkbox">
                <input
                  type="checkbox"
                  name="JobsiteSupervisorID"
                  checked={useEmpty.JobsiteSupervisorID}
                  onChange={handleCheckboxChange}
                />
              </label>
            </label> */}
          </>
        );
      /* case "activity_log":
        if (isPutBodyEmpty()) {
          setPutBody(v.activity_log);
          setUseEmpty(b.activity_log);
        }
        return (
          <>
            <label className="label-main">
              Activity ID:
              <input
                type="text"
                name="ActivityID"
                
                placeholder="ex. 123"
                value={putBody.ActivityID}
                onChange={handleChange}
              />
            </label>
            <label className="label-main">
              Emp ID:
              <input
                type="text"
                name="EmpID"
                
                placeholder="ex. 123"
                value={putBody.EmpID}
                onChange={handleChange}
              />
            </label>
            <label className="label-main">
              Action:
              <input
                type="text"
                name="Action"
                
                placeholder="add description of task"
                value={putBody.Action}
                onChange={handleChange}
              />
            </label>
            <label className="label-main">
              Jobsite ID:
              <input
                type="text"
                name="JobsiteID"
                
                placeholder="ex. 123"
                value={putBody.JobsiteID}
                onChange={handleChange}
              />
            </label>
            <label className="label-main">
              Time-stamp:
              <input
                type="text"
                name="TimeDone"
                
                placeholder="yyyy-mm-dd 24:60:00"
                value={putBody.TimeDone}
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
        setHTTPBody={setPutBody}
      />
      <div className="dashboard-form-info">
        <span>* required</span>
        <label className="label-checkbox">
          <input type="checkbox" name="example" checked={false} readOnly />
          set to empty
        </label>
      </div>
      <form className="dashboard-form">
        <fieldset>{displayTableInputs()}</fieldset>

        <FormButtons
          setChosenTable={setChosenTable}
          chosenTable={chosenTable}
          setHTTPBody={setPutBody}
          httpBody={putBody}
          httpMethod={putMethod}
          useEmpty={useEmpty}
        />
      </form>
    </>
  );
};

export default PutForms;
