import { useState, useContext, useEffect } from "react";
import FormButtons from "./FormButtons";
import SelectTableOptions from "./SelectTableOptions";
import { DashboardContext } from "../../pages/Dashboard";
import { DELETE_FIELDS as TABLE_FIELDS } from "./formConfigs";

const FormInput = ({ label, name, placeholder, value, onChange }) => (
  <label className="label-main">
    <span className="delete-form-span">{label}:</span>
    <input
      type="text"
      name={name}
      placeholder={placeholder}
      value={value || ""}
      onChange={onChange}
    />
  </label>
);

const DeleteForms = () => {
  const [deleteBody, setDeleteBody] = useState({});
  const [chosenTable, setChosenTable] = useState("");
  const { deleteMethod } = useContext(DashboardContext);

  useEffect(() => {
    setDeleteBody({});
  }, [chosenTable]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeleteBody({ ...deleteBody, [name]: value });
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

      <form className="dashboard-form delete-form">
        <fieldset>
          {TABLE_FIELDS[chosenTable]?.map((field) => (
            <FormInput
              key={field.name}
              {...field}
              value={deleteBody[field.name]}
              onChange={handleChange}
            />
          ))}
        </fieldset>

        <div className="form-btns-container">
          <FormButtons
            setChosenTable={setChosenTable}
            chosenTable={chosenTable}
            setHTTPBody={setDeleteBody}
            httpBody={deleteBody}
            httpMethod={deleteMethod}
          />
        </div>
      </form>
    </>
  );
};

export default DeleteForms;
