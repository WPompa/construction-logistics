//
const CurrentLimit = (props) => {
  const handleChange = (e) => {
    props.value.current = Number(e.target.value);

    props.function("limit", props.value.current);
  };

  return (
    <div className="select-current-limit">
      <label htmlFor="CurrentLimit">Per Page: </label>
      <select
        name="CurrentLimit"
        id="CurrentLimit"
        defaultValue={10}
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
