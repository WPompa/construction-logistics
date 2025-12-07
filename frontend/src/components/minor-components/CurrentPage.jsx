import "./css/current-page.css";

const CurrentPage = (props) => {
  const handlechange = (e) => {
    props.value.current = Number(e.target.value);
    if (props.value.current <= 0) {
      props.value.current = 1;
    }

    props.function("page", props.value.current);
  };

  return (
    <div className="select-current-page">
      <label htmlFor="CurrentPage">Page: </label>
      <input
        type="number"
        name="CurrentPage"
        id="CurrentPage"
        min={1}
        placeholder={props.value.current}
        onChange={handlechange}
      />
    </div>
  );
};

export default CurrentPage;
