export const formInputValues = {
  employees: {
    EmpID: "",
    Fname: "",
    Lname: "",
    Title: "",
    SupervisorID: "",
    JobsiteID: "",
  },
  material: {
    MaterialID: "",
    Name: "",
    MaterialType: "",
    Length: "",
    Width: "",
    Height: "",
    SupplierName: "",
    TotalAvailable: "",
    LostAmounts: "",
  },
  stored_in: {
    StorageAreaID: "",
    MaterialID: "",
    Amount: "",
  },
  storage_area: {
    StorageAreaID: "",
    Length: "",
    Width: "",
    Height: "",
    Location: "",
    JobsiteID: "",
    TotalStored: "",
    Is_Container: "",
  },
  jobsite: {
    JobsiteID: "",
    JobsiteName: "",
    /* JobsiteSupervisorID: "", */
  },
  /* activity_log: {
    ActivityID: "",
    EmpID: "",
    Action: "",
    JobsiteID: "",
    TimeDone: "",
  }, */
};

export const formInputBooleans = {
  material: {
    Length: false,
    Width: false,
    Height: false,
  },
  storage_area: {
    Length: false,
    Width: false,
    Height: false,
  },
  jobsite: {
    JobsiteSupervisorID: false,
  },
};

//Can be reduced, but leave like this for now just in case.
/* export const formInputBooleans = {
  employees: {
    EmpID: false,
    Fname: false,
    Lname: false,
    Title: false,
    SupervisorID: false,
    JobsiteID: false,
  },
  material: {
    MaterialID: false,
    Name: false,
    MaterialType: false,
    Length: false,
    Width: false,
    Height: false,
    SupplierName: false,
    TotalAvailable: false,
    LostAmounts: false,
  },
  stored_in: {
    StorageAreaID: false,
    MaterialID: false,
    Amount: false,
  },
  storage_area: {
    StorageAreaID: false,
    Length: false,
    Width: false,
    Height: false,
    Location: false,
    JobsiteID: false,
    TotalStored: false,
    Is_Container: false,
  },
  jobsite: {
    JobsiteID: false,
    JobsiteName: false,
    JobsiteSupervisorID: false,
  },
  /* activity_log: {
    ActivityID: false,
    EmpID: false,
    Action: false,
    JobsiteID: false,
    TimeDone: false,
  }, 
}; */
