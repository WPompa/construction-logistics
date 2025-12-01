import { useState, useContext } from "react";
import FormButtons from "./FormButtons";
import SelectTableOptions from "./SelectTableOptions";
import { DashboardContext } from "../../pages/Dashboard";
import { formInputValues as v } from "./controlledInputsData";

const PostForms = () => {
  const [postBody, setPostBody] = useState({});
  const [chosenTable, setChosenTable] = useState("");
  const { postMethod } = useContext(DashboardContext);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPostBody({ ...postBody, [name]: value });
  };

  const isPostBodyEmpty = () => {
    return Object.keys(postBody).length === 0;
  };

  const displayTableInputs = () => {
    switch (chosenTable) {
      case "employees":
        if (isPostBodyEmpty()) {
          setPostBody(v.employees);
        }
        return (
          <>
            <label className="label-main">
              Emp ID:
              <input
                type="text"
                name="EmpID"
                placeholder="ex. 123"
                value={postBody.EmpID}
                onChange={handleChange}
              />
            </label>
            <label className="label-main">
              First name:
              <input
                type="text"
                name="Fname"
                placeholder="john"
                value={postBody.Fname}
                onChange={handleChange}
              />
              *
            </label>
            <label className="label-main">
              Last name:
              <input
                type="text"
                name="Lname"
                placeholder="doe"
                value={postBody.Lname}
                onChange={handleChange}
              />
              *
            </label>
            <label className="label-main">
              Job Title:
              <input
                type="text"
                name="Title"
                placeholder="journeyman"
                value={postBody.Title}
                onChange={handleChange}
              />
            </label>
            <label className="label-main">
              Supervisor ID:
              <input
                type="text"
                name="SupervisorID"
                placeholder="ex. 123"
                value={postBody.SupervisorID}
                onChange={handleChange}
              />
            </label>
            <label className="label-main">
              Jobsite ID:
              <input
                type="text"
                name="JobsiteID"
                placeholder="ex. 123"
                value={postBody.JobsiteID}
                onChange={handleChange}
              />
            </label>
          </>
        );
      case "materials":
        if (isPostBodyEmpty()) {
          setPostBody(v.material);
        }
        return (
          <>
            <label className="label-main">
              Material ID:
              <input
                type="text"
                name="MaterialID"
                placeholder="ex. 123"
                value={postBody.MaterialID}
                onChange={handleChange}
              />
            </label>
            <label className="label-main">
              Name:
              <input
                type="text"
                name="Name"
                placeholder="brand name 123"
                value={postBody.Name}
                onChange={handleChange}
              />
              *
            </label>
            <label className="label-main">
              Material Type:
              <input
                type="text"
                name="MaterialType"
                placeholder="insulation, tape, ..."
                value={postBody.MaterialType}
                onChange={handleChange}
              />
              *
            </label>
            <label className="label-main">
              Box Length:
              <input
                type="text"
                name="Length"
                placeholder="length inches"
                value={postBody.Length}
                onChange={handleChange}
              />
            </label>
            <label className="label-main">
              Box Width:
              <input
                type="text"
                name="Width"
                placeholder="width inches"
                value={postBody.Width}
                onChange={handleChange}
              />
            </label>
            <label className="label-main">
              Box Height:
              <input
                type="text"
                name="Height"
                placeholder="height inches"
                value={postBody.Height}
                onChange={handleChange}
              />
            </label>
            <label className="label-main">
              Supplier Name:
              <input
                type="text"
                name="SupplierName"
                placeholder="acme inc."
                value={postBody.SupplierName}
                onChange={handleChange}
              />
              *
            </label>
            <label className="label-main">
              Available:
              <input
                type="text"
                name="TotalAvailable"
                placeholder="total available"
                value={postBody.TotalAvailable}
                onChange={handleChange}
              />
            </label>
            <label className="label-main">
              Lost:
              <input
                type="text"
                name="LostAmounts"
                placeholder="total lost"
                value={postBody.LostAmounts}
                onChange={handleChange}
              />
            </label>
          </>
        );
      case "stored_in":
        if (isPostBodyEmpty()) {
          setPostBody(v.stored_in);
        }
        return (
          <>
            <label className="label-main">
              Storage Area ID:
              <input
                type="text"
                name="StorageAreaID"
                placeholder="ex. 123"
                value={postBody.StorageAreaID}
                onChange={handleChange}
              />
              *
            </label>
            <label className="label-main">
              Material ID:
              <input
                type="text"
                name="MaterialID"
                placeholder="ex. 123"
                value={postBody.MaterialID}
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
                value={postBody.Amount}
                onChange={handleChange}
              />
              *
            </label>
          </>
        );
      case "storage_areas":
        if (isPostBodyEmpty()) {
          setPostBody(v.storage_area);
        }
        return (
          <>
            <label className="label-main">
              Storage Area ID:
              <input
                type="text"
                name="StorageAreaID"
                placeholder="ex. 123"
                value={postBody.StorageAreaID}
                onChange={handleChange}
              />
            </label>
            <label className="label-main">
              Inner Length:
              <input
                type="text"
                name="Length"
                placeholder="length feet"
                value={postBody.Length}
                onChange={handleChange}
              />
            </label>
            <label className="label-main">
              Inner Width:
              <input
                type="text"
                name="Width"
                placeholder="width feet"
                value={postBody.Width}
                onChange={handleChange}
              />
            </label>
            <label className="label-main">
              Inner Height:
              <input
                type="text"
                name="Height"
                placeholder="height feet"
                value={postBody.Height}
                onChange={handleChange}
              />
            </label>
            <label className="label-main">
              Location:
              <input
                type="text"
                name="Location"
                placeholder="laydown 123"
                value={postBody.Location}
                onChange={handleChange}
              />
              *
            </label>
            <label className="label-main">
              Jobsite ID:
              <input
                type="text"
                name="JobsiteID"
                placeholder="ex. 123"
                value={postBody.JobsiteID}
                onChange={handleChange}
              />
            </label>
            <label className="label-main">
              Total Stored:
              <input
                type="text"
                name="TotalStored"
                placeholder="ex. 10"
                value={postBody.TotalStored}
                onChange={handleChange}
              />
            </label>
            <label className="label-main">
              Is Container?:
              <input
                type="text"
                name="Is_Container"
                placeholder="yes, no"
                value={postBody.Is_Container}
                onChange={handleChange}
              />
            </label>
          </>
        );
      case "jobsites":
        if (isPostBodyEmpty()) {
          setPostBody(v.jobsite);
        }
        return (
          <>
            <label className="label-main">
              Jobsite ID:
              <input
                type="text"
                name="JobsiteID"
                placeholder="ex. 123"
                value={postBody.JobsiteID}
                onChange={handleChange}
              />
            </label>
            <label className="label-main">
              Jobsite Name:
              <input
                type="text"
                name="JobsiteName"
                placeholder="abc data center"
                value={postBody.JobsiteName}
                onChange={handleChange}
              />
              *
            </label>
            {/* <label className="label-main">
              Supervisor ID:
              <input
                type="text"
                name="JobsiteSupervisorID"
                placeholder="ex. 123"
                value={postBody.JobsiteSupervisorID}
                onChange={handleChange}
              />
            </label> */}
          </>
        );
      /* case "activity_log":
        if (isPostBodyEmpty()) {
          setPostBody(v.activity_log);
        }
        return (
          <>
            <label className="label-main">
              Activity ID:
              <input
                type="text"
                name="ActivityID"
                placeholder="ex. 123"
                value={postBody.ActivityID}
                onChange={handleChange}
              />
            </label>
            <label className="label-main">
              Emp ID:
              <input
                type="text"
                name="EmpID"
                placeholder="ex. 123"
                value={postBody.EmpID}
                onChange={handleChange}
              />
            </label>
            <label className="label-main">
              Action:
              <input
                type="text"
                name="Action"
                placeholder="add description of task"
                value={postBody.Action}
                onChange={handleChange}
              />
            </label>
            <label className="label-main">
              Jobsite ID:
              <input
                type="text"
                name="JobsiteID"
                placeholder="ex. 123"
                value={postBody.JobsiteID}
                onChange={handleChange}
              />
            </label>
            <label className="label-main">
              Time-stamp:
              <input
                type="text"
                name="TimeDone"
                placeholder="yyyy-mm-dd 24:60:00"
                value={postBody.TimeDone}
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
        setHTTPBody={setPostBody}
      />
      <div className="dashboard-form-info">
        <span>* required</span>
      </div>
      <form className="dashboard-form">
        <fieldset>{displayTableInputs()}</fieldset>

        <FormButtons
          setChosenTable={setChosenTable}
          chosenTable={chosenTable}
          setHTTPBody={setPostBody}
          httpBody={postBody}
          httpMethod={postMethod}
        />
      </form>
    </>
  );
};

export default PostForms;
