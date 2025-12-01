import { useContext } from "react";
import { DashboardContext } from "../../pages/Dashboard";

function FormButtons({
  setChosenTable,
  chosenTable,
  httpBody,
  setHTTPBody,
  httpMethod,
  useEmpty,
}) {
  const { setMethodOption } = useContext(DashboardContext);
  return (
    <>
      <button
        type="button"
        onClick={() => {
          setMethodOption("");
          setChosenTable("");
          setHTTPBody({});
        }}
      >
        Back
      </button>

      <button
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          useEmpty
            ? httpMethod(chosenTable, httpBody, useEmpty)
            : httpMethod(chosenTable, httpBody);
          setHTTPBody({});
        }}
      >
        Submit
      </button>
    </>
  );
}

export default FormButtons;
