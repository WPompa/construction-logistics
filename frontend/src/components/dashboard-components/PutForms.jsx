import { useState, useContext, useEffect } from "react";
import FormButtons from "./FormButtons";
import SelectTableOptions from "./SelectTableOptions";
import { DashboardContext } from "../../pages/Dashboard";
import { PUT_FIELDS as TABLE_FIELDS } from "./formConfigs";
import { validateForm } from "../../utils/validation";

const FormInput = ({
  label,
  name,
  placeholder,
  required,
  value,
  onChange,
  error,
  hasCheckbox,
  checkboxValue,
  onCheckboxChange,
}) => {
  return (
    <label className={`label-main ${error ? "input-error" : ""}`}>
      {hasCheckbox ? (
        // Checkbox
        <div className="label-text-container">
          <span>
            {label}: {required && <span className="required-star">*</span>}
          </span>
          <span className="label-checkbox">
            <input
              type="checkbox"
              name={name}
              checked={checkboxValue || false}
              onChange={onCheckboxChange}
            />
          </span>
        </div>
      ) : (
        // No checkbox
        <span>
          {label}: {required && <span className="required-star">*</span>}
        </span>
      )}

      <input
        type="text"
        name={name}
        placeholder={placeholder}
        value={value || ""}
        onChange={onChange}
      />
      {error && <span className="error-text">{error}</span>}
    </label>
  );
};

const PutForms = () => {
  const [putBody, setPutBody] = useState({});
  const [useEmpty, setUseEmpty] = useState({});
  const [errors, setErrors] = useState({});
  const [chosenTable, setChosenTable] = useState("");
  const { putMethod } = useContext(DashboardContext);

  useEffect(() => {
    setErrors({});
    setPutBody({});
    setUseEmpty({});
  }, [chosenTable]);

  const validate = () => {
    const config = TABLE_FIELDS[chosenTable] || [];
    const formErrors = validateForm(putBody, config);
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPutBody({ ...putBody, [name]: value });

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setUseEmpty({ ...useEmpty, [name]: checked });
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

      <form className="dashboard-form put-form">
        <fieldset>
          {TABLE_FIELDS[chosenTable]?.map((field) => (
            <FormInput
              key={field.name}
              {...field}
              value={putBody[field.name]}
              onChange={handleChange}
              error={errors[field.name]}
              checkboxValue={useEmpty[field.name]}
              onCheckboxChange={handleCheckboxChange}
            />
          ))}
        </fieldset>

        <div className="form-btns-container">
          <FormButtons
            setChosenTable={setChosenTable}
            chosenTable={chosenTable}
            setHTTPBody={setPutBody}
            httpBody={putBody}
            httpMethod={putMethod}
            useEmpty={useEmpty}
            validate={validate}
          />
        </div>
      </form>
    </>
  );
};

export default PutForms;
