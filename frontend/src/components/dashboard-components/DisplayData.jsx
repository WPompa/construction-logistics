//

const DisplayData = ({ tableUrl, data }) => {
  //Could probably just use Object.keys()
  const columnNames = () => {
    if (data.length === 0) {
      return [];
    }

    let result = [];

    for (const propertyName in data[0]) {
      result.push(<th key={propertyName}> {propertyName} </th>);
    }

    return result;
  };

  const rowData = () => {
    if (data.length === 0 || data.length === undefined) {
      return [];
    }

    let propertyNames = Object.keys(data[0]);
    let result = [];

    for (let i = 0; i < data.length; i++) {
      result.push([]);

      for (let j = 0; j < propertyNames.length; j++) {
        result[i].push(
          <td key={"row " + i + " prop: " + propertyNames[j]}>
            {data[i][propertyNames[j]]}
          </td>
        );
      }
    }

    return result;
  };

  if (!tableUrl) return <></>;

  //rowData should not use index i for key prop. Fix, then remove comment.
  return (
    <table>
      <thead>
        <tr>{columnNames()}</tr>
      </thead>
      <tbody>
        {rowData().map((rowData, i) => (
          <tr
            key={i}
            className="table-item"
            onClick={() => alert("Click! (future feature)")}
          >
            {rowData}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DisplayData;
