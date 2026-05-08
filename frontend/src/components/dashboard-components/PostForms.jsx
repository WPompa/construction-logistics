//
import { useState, useContext, useEffect } from "react";
import FormButtons from "./FormButtons";
import SelectTableOptions from "./SelectTableOptions";
import { DashboardContext } from "../../pages/Dashboard";
import { POST_FIELDS as TABLE_FIELDS } from "./formConfigs";
import { validateForm } from "../../utils/validation";

const FormInput = ({
  label,
  name,
  placeholder,
  required,
  value,
  onChange,
  error,
}) => {
  return (
    <label className={`label-main ${error ? "input-error" : ""}`}>
      <span>
        {label}: {required && <span className="required-star">*</span>}
      </span>
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

const PostForms = () => {
  const [postBody, setPostBody] = useState({});
  const [errors, setErrors] = useState({});
  const [chosenTable, setChosenTable] = useState("");
  const { postMethod } = useContext(DashboardContext);

  useEffect(() => {
    setErrors({});
    setPostBody({});
  }, [chosenTable]);

  const validate = () => {
    const config = TABLE_FIELDS[chosenTable] || [];
    const formErrors = validateForm(postBody, config);
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostBody({ ...postBody, [name]: value });

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
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

      <form className="dashboard-form post-form">
        <fieldset>
          {TABLE_FIELDS[chosenTable]?.map((field) => (
            <FormInput
              key={field.name}
              {...field}
              value={postBody[field.name]}
              onChange={handleChange}
              error={errors[field.name]}
            />
          ))}
        </fieldset>

        <div className="form-btns-container">
          <FormButtons
            setChosenTable={setChosenTable}
            chosenTable={chosenTable}
            setHTTPBody={setPostBody}
            httpBody={postBody}
            httpMethod={postMethod}
            validate={validate}
          />
        </div>
      </form>
    </>
  );
};

export default PostForms;
