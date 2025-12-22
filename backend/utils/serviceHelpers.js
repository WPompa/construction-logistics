const { AppError } = require("../utils/AppError");
const { Op } = require("sequelize");

//Check for empty strings. The model validators will validate.
const checkForRequiredValues = (required, modelData) => {
  for (let i = required.length - 1; i >= 0; i--) {
    //Will this const be an issue?
    const key = required[i];

    if (modelData[key] !== "") {
      required.splice(i, 1);
    }
  }

  if (required.length > 0) {
    throw new AppError(`Required Values: ${required}`, 400);
  }
};

//Empty values outside of the required can be deleted.
const removeEmptyValues = (modelData, useEmpty = {}) => {
  for (let key in modelData) {
    if (modelData[key] === "" && useEmpty?.[key] !== true) {
      delete modelData[key];
    } else if (useEmpty?.[key] === true) {
      modelBody[key] = null;
    }
  }
};

//Creates {[Key]: [value1, value2, ...]} from multiple entries per Key.
//Used in creating options for model.update() & model.destroy().
//"hasPK" is used for "keys" that are primary keys with multiple entries. Do not mix with non-primary keys.
const processKeyValues = (keys, modelData, hasPK = false) => {
  let keyValuesArr = [];

  keys.forEach((key) => {
    keyValuesArr.push({
      [key]: modelData[key]
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== ""),
    });

    if (hasPK) {
      delete modelData[key];
    }
  });

  return keyValuesArr;
};

//Needs Explanation
const setUpdateOptions = (primaryKeys, primaryKeyValuesArr) => {
  let options = {};

  if (primaryKeys.length > 1) {
    console.log("primaryKeys > 1");

    primaryKeys.forEach((primaryKey, index) => {
      options[primaryKey] = { [Op.or]: primaryKeyValuesArr[index][primaryKey] };
    });
  } else {
    const primaryKey = primaryKeys[0];

    options[primaryKey] = {
      [Op.or]: primaryKeyValuesArr[0][primaryKey],
    };
  }

  return options;
};

const setDeleteOptions = (keyValuesArr) => {
  let options = {};

  keyValuesArr.forEach((item, index) => {
    const [primaryKey] = Object.keys(item);

    options[primaryKey] = { [Op.or]: keyValuesArr[index][primaryKey] };
  });

  return options;
};

module.exports = {
  checkForRequiredValues,
  removeEmptyValues,
  processKeyValues,
  setUpdateOptions,
  setDeleteOptions,
};
