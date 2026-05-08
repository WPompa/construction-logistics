import "./css/current-limit.css";

const CurrentLimit = ({ value, function: updateParams }) => {
  const handleChange = (e) => {
    const newLimit = Number(e.target.value);

    updateParams({
      limit: newLimit,
      page: 1,
    });
  };

  return (
    <div className="select-current-limit">
      <label htmlFor="CurrentLimit">Per Page: </label>
      <select
        name="CurrentLimit"
        id="CurrentLimit"
        value={value}
        onChange={handleChange}
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
        <option value={20}>20</option>
        <option value={30}>30</option>
        <option value={40}>40</option>
        <option value={50}>50</option>
      </select>
    </div>
  );
};

export default CurrentLimit;
