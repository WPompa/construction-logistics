const { sequelize: connection } = require("../database/connect");
const { Op } = require("sequelize");
//const connection = connectToDB();
/* I will probably need to use sequelize because writing the validations for each table + http method might be a big hassle and get extensive. */

const asyncWrapper = require("../middleware/asyncWrapper");
const { createErrorAPI } = require("../middleware/ErrorAPI");

tableQueries = {
  employees: `SELECT empid AS "Emp ID", fname AS "First Name", lname AS "Last Name", Title, supervisorid AS "Supervisor", jobsiteid AS "Jobsite" FROM employees`,
  material: `SELECT MaterialID as "Mat ID", Name, MaterialType as "Material Type", Length, Width, Height, SupplierName as "Supplier Name", TotalAvailable as "Total Available", LostAmounts as "Lost Amounts" from material`,
  stored_in: `SELECT StorageAreaID AS "Storage Area", MaterialID AS "Material", Amount FROM stored_in`,
  storage_area: `SELECT StorageAreaID AS "Storage Area ID", Length, Width, Height, Location, JobsiteID AS "Jobsite ID", TotalStored AS "Total Stored", Is_Container FROM storage_area`,
  jobsite: `SELECT JobsiteID AS "Jobsite ID", JobsiteName AS "Jobsite Name", JobsiteSupervisorID AS "Jobsite Supervisor" FROM jobsite`,
  activity_log: `SELECT ActivityID AS "Activity ID", EmpID AS "Emp ID", Action, JobsiteID AS "Jobsite ID", timedone AS "Time-Stamp" FROM activity_log`,
};

let allPrimaryKeys; //becomes array of objects {tableName:TablePrimaryKeyName}
const getPrimaryKeys = asyncWrapper(async () => {
  const [result] = await connection.query(
    `SELECT TABLE_NAME as "tableName", COLUMN_NAME as "primaryKey" FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = "${process.env.MYSQL_DATABASE}" AND COLUMN_KEY = "PRI"`
  );
  //
  if (result) {
    allPrimaryKeys = result;
    //console.log(allPrimaryKeys);
    console.log("Primary Keys acquired.");
  } else {
    console.log(result?.message); //What do for this situation?
  }
});
getPrimaryKeys();

/////////////////////////////////////////////////////////////////////

/*
return next(createErrorAPI(msg, 404))
*/

const getTable = asyncWrapper(async (req, res) => {
  const table = req.query.table;
  const sqlQuery = tableQueries[table];

  /* connection.models.employee // ...models[someVar].findAll()... would work too.
    .findAll()
    .then((result) => console.log(JSON.stringify(result, null, 2))); */

  const [result] = await connection.query(sqlQuery);
  res.status(200).json(result);
});

const createTableRow = asyncWrapper(async (req, res, next) => {
  const { postBody, table } = req.body;

  for (let key in postBody) {
    //remove empty values
    if (postBody[key] === "") {
      delete postBody[key];
    } /* else {
      //Adds proper capitalization. Might be cases where this is a bad choice, imagine weird company name i.e CompanyABC would become Companyabc.
      postBody[key] =
        postBody[key].charAt(0).toUpperCase() +
        postBody[key].slice(1).toLowerCase();
    } */
  }
  const result = await connection.models[table].create(postBody); //{fields: []} to exclude injected key-values.

  if (!result) {
    console.log("bad result");
    return next(createErrorAPI("Error Creating Row", 400));
  }

  console.log(JSON.stringify(result));
  res.status(201).json(result);
});

/* const createTableRow = asyncWrapper(async (req, res, next) => {
  const table = req.body.table;
  const postBody = req.body.postBody;

  const columns = [];
  for (let key in postBody) {
    if (postBody[key] !== "") {
      columns.push(key);
    }
  }
  const objValues = Object.values(postBody).filter((value) => value !== "");

  console.log("table: " + table);
  console.log("postBody: ");
  const sqlQuery = `INSERT INTO ${table} (${columns}) VALUES (?)`;
  let values = [objValues];
  console.log(columns);
  console.log(values);
  connection.query(sqlQuery, values, (err, result, fields) => {
    if (!err) {
      console.log("Post() good");
      console.log(result);
      res.status(201).json({ result });
    } else {
      console.log(err.message);
      res.send(err);
    }
  });
}); */

const updateTableRow = asyncWrapper(async (req, res, next) => {
  const { putBody, table, useEmpty } = req.body;
  console.log("putBody");
  console.log(putBody);
  //////////////////////////////////////////////////////////////////////
  //Deal with 1 or more primary keys.
  //Stored_in table has composite primary keys. This checks for such tables.
  //stored_in would be [{tableName1, primaryKey1}, {tableName1, primaryKey2}]
  const tablePrimaryKeys = allPrimaryKeys.filter(
    (dbTable) => dbTable.tableName === table
  );
  /* console.log("-------------------------");
  console.log("tablePrimaryKeys:");
  console.log(tablePrimaryKeys);
  console.log("-------------------------");
  console.log("allPrimaryKeys:");
  console.log(allPrimaryKeys);
  console.log("-------------------------"); */
  //////////////////////////////////////////////////////////////////////
  //Separate PKs from putBody into array.
  //store_in should give arrayOfPKValues[{pkObj1},{pkObj2}], others [{pkObj}]
  let arrayOfPKValues = [];
  let isMissingPKValue = false;
  tablePrimaryKeys.forEach((column) => {
    let key = column["primaryKey"];

    //Stop if any primary key values are missing.
    if (putBody[key] === "") {
      console.log("Error in Put request. Missing Primary Key value for: ");
      console.log(key);
      console.log("-------------------------");
      isMissingPKValue = true;
      return next(createErrorAPI(`Please fill out ${key}`, 400));
    }

    //Creates {<primary key>: [value1, value2, ...]} for multiple entries. Removes white space.
    arrayOfPKValues.push({
      [key]: putBody[key]
        .split(",")
        .map((item) => item.trim())
        .filter((elem) => elem !== ""),
    });

    delete putBody[key];
  });
  if (isMissingPKValue) {
    return;
  }
  //////////////////////////////////////////////////////////////////////
  // Look for empty key-values and remove the keys. Need to check for "set null" flag here.
  for (let key in putBody) {
    if (putBody[key] === "" && useEmpty?.[key] !== true) {
      //remove empty values
      console.log(key + " will be deleted");
      delete putBody[key];
    } else if (useEmpty?.[key] === true) {
      putBody[key] = null;
    }
  }

  //////////////////////////////////////////////////////////////////////

  console.log("-------------------------");
  console.log("putBody w/ no empty values:");
  console.log(putBody);
  console.log("-------------------------");
  console.log("arrayOfPKValues: ");
  console.log(arrayOfPKValues);
  console.log("-------------------------");
  console.log("tablePrimaryKeys: ");
  console.log(tablePrimaryKeys);

  let options = {};
  if (tablePrimaryKeys.length > 1) {
    console.log("tablePrimaryKeys > 1");

    tablePrimaryKeys.forEach((table, index) => {
      const primaryKey = table["primaryKey"];
      options[primaryKey] = { [Op.or]: arrayOfPKValues[index][primaryKey] };
    });
  } else {
    const primaryKey = tablePrimaryKeys[0].primaryKey;
    options = {
      [primaryKey]: {
        [Op.or]: arrayOfPKValues[0][primaryKey],
      },
    };
  }

  console.log("options obj: ");
  console.log(options);
  const result = await connection.models[table].update(putBody, {
    where: options,
  });

  console.log(JSON.stringify(result));
  res.status(201).json("Updated rows: " + result[0]); //lookup proper status code
});

/* const updateTableRow = asyncWrapper(async (req, res) => {
  const table = req.body.table;
  const sqlQuery = `UPDATE ${table} SET ? WHERE ?`;
  const fetchBody = req.body.putBody;
  const primaryKeys = {};

  //Stored_in table has composite primary keys. This checks for such tables.
  const tablePrimaryKeys = allPrimaryKeys.filter(
    (dbTable) => dbTable.tableName === table
  );

  tablePrimaryKeys.forEach((column) => {
    let key = column["primaryKey"];
    primaryKeys[key] = fetchBody[key];
  });

  const values = [fetchBody, primaryKeys];
  console.log(primaryKeys);
  connection.query(sqlQuery, values, (err, result, fields) => {
    if (!err) {
      console.log("Put() good");
      console.log(result);
      res.send(result);
    } else {
      console.log(err.message);
      res.send(err);
    }
  });
}); */

const deleteTableRow = asyncWrapper(async (req, res, next) => {
  const { table, deleteBody } = req.body;
  let arrayOfPKValues = [];
  for (let key in deleteBody) {
    if (deleteBody[key] === "") {
      console.log(key + " will be deleted");
      delete deleteBody[key];
    } else {
      arrayOfPKValues.push({
        [key]: deleteBody[key]
          .split(",")
          .map((item) => item.trim())
          .filter((elem) => elem !== ""),
      });
    }
  }

  let options = {};
  console.log("arrayOfPKValues");
  console.log(arrayOfPKValues);
  arrayOfPKValues.forEach((item, index) => {
    const [primaryKey] = Object.keys(item);
    options[primaryKey] = { [Op.or]: arrayOfPKValues[index][primaryKey] };
  });

  console.log("options:");
  console.log(options);
  const result = await connection.models[table].destroy({
    where: options,
  });
  if (result > 0) {
    console.log("result > 0");
    console.log(result);
    res.status(201).json("Updated rows: " + result);
  } else {
    console.log(result);
    res.status(404).json("No matching rows");
  }
});

/* const deleteTableRow = asyncWrapper(async (req, res) => {
  const table = req.body.table;
  const sqlQuery = `DELETE FROM ${table} WHERE ?`;
  const fetchBody = req.body.fetchBody;
  const primaryKeys = {};

  //Stored_in table has composite primary keys. This checks for such tables.
  const tablePrimaryKeys = allPrimaryKeys.filter(
    (dbTable) => dbTable.tableName === table
  );

  tablePrimaryKeys.forEach((column) => {
    let key = column["primaryKey"];
    primaryKeys[key] = fetchBody.targetID;
  });

  const values = [primaryKeys];
  console.log(primaryKeys);
  connection.query(sqlQuery, primaryKeys, (err, result, fields) => {
    if (!err) {
      console.log("delete() good");
      console.log(result);
      res.send(result);
    } else {
      console.log(err.message);
      res.send(err);
    }
  });
}); */

module.exports = { getTable, createTableRow, updateTableRow, deleteTableRow };
