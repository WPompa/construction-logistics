import "./css/current-page.css";

const CurrentPage = ({ value, metadata, limit, function: updateParams }) => {
  const totalCount = metadata?.totalCount || 0;
  const perPage = metadata?.perPage || limit || 10;
  const maxPages = Math.ceil(totalCount / perPage) || 1;

  const handleChange = (e) => {
    let requestedPage = Number(e.target.value);

    if (requestedPage < 1) requestedPage = 1;
    if (requestedPage > maxPages) requestedPage = maxPages;

    updateParams({ page: requestedPage });
  };

  return (
    <div className="select-current-page">
      <label htmlFor="CurrentPage">Page: </label>
      <input
        type="number"
        name="CurrentPage"
        id="CurrentPage"
        min={1}
        max={maxPages}
        value={value}
        onChange={handleChange}
      />
      <span className="total-pages-label"> of {maxPages}</span>
    </div>
  );
};

export default CurrentPage;
