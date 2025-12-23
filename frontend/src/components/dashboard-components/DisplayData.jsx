//

const DisplayData = ({ tableToDisplay, data }) => {
  //Could probably just use Object.keys()
  const getColumnNames = () => {
    if (!data.result?.length) {
      return [];
    }

    const result = [];
    for (const propertyName in data.result[0]) {
      result.push(<th key={propertyName}> {propertyName} </th>);
    }

    return result;
  };

  const getRowData = () => {
    if (data.result?.length === 0 || data.result?.length === undefined) {
      return [];
    }

    let propertyNames = Object.keys(data.result[0]);
    const result = [];

    for (let i = 0; i < data.result.length; i++) {
      result.push([]);

      for (let j = 0; j < propertyNames.length; j++) {
        result[i].push(
          <td key={"row " + i + " prop: " + propertyNames[j]}>
            {data.result[i][propertyNames[j]]}
          </td>
        );
      }
    }

    return result;
  };

  if (!tableToDisplay) return <></>;

  //getRowData should not use index i for key prop. Fix, then remove comment.
  return (
    <table>
      <thead>
        <tr>{getColumnNames()}</tr>
      </thead>
      <tbody>
        {getRowData().map((RowData, i) => (
          <tr
            key={i}
            className="table-item"
            onClick={() => alert("Click! (future feature)")}
          >
            {RowData}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DisplayData;
