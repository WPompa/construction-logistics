const tables = {
  leadership: {
    count: `SELECT COUNT(*) AS Count
        FROM ( SELECT DISTINCT emp1.empid AS EmpID, CONCAT(emp1.fname, ' ', emp1.lname) AS Name, emp1.title AS Title, emp1.JobsiteID AS JobsiteID, JobsiteName
        FROM employees AS emp1
        JOIN employees AS emp2
        ON emp2.supervisorid = emp1.empid
        JOIN Jobsites
        ON emp1.JobsiteID = Jobsites.JobsiteID
        ORDER BY emp1.empid ASC
        ) AS Result;`,
    query: `SELECT DISTINCT emp1.empid AS EmpID, CONCAT(emp1.fname, ' ', emp1.lname) AS Name, emp1.title AS Title, emp1.JobsiteID AS JobsiteID, JobsiteName
        FROM employees AS emp1
        JOIN employees AS emp2
        ON emp2.supervisorid = emp1.empid
        JOIN Jobsites
        ON emp1.JobsiteID = Jobsites.JobsiteID
        ORDER BY emp1.empid ASC
        LIMIT :limit OFFSET :offset;`,
  },

  "emp + jobsites": {
    count: `SELECT COUNT(*) AS Count
        FROM ( SELECT employees.empid AS EmpID, employees.fname AS FirstName, employees.lname AS LastName, employees.title AS Title,
            jobsites.jobsitename AS Jobsite
            FROM employees 
            LEFT JOIN jobsites 
            ON employees.jobsiteid = jobsites.jobsiteid
        ) AS Result;`,
    query: `SELECT employees.empid AS EmpID, employees.fname AS FirstName, employees.lname AS LastName, employees.title AS Title,
        jobsites.jobsitename AS Jobsite
        FROM employees 
        LEFT JOIN jobsites 
        ON employees.jobsiteid = jobsites.jobsiteid 
        LIMIT :limit OFFSET :offset;`,
  },

  "mat. amounts": {
    count: `SELECT COUNT(*) AS Count
        FROM ( SELECT  materials.name AS Name, materials.suppliername AS Brand,
            storage_areas.location AS Location, 
            jobsites.jobsitename AS Jobsite, 
            stored_in.amount AS Amount
            FROM materials
            JOIN stored_in
            ON materials.materialid = stored_in.materialid
            JOIN storage_areas
            ON storage_areas.storageareaid = stored_in.storageareaid
            JOIN jobsites
            ON jobsites.jobsiteid = storage_areas.jobsiteid
            ORDER BY materials.name        
        ) AS Result;`,
    query: `SELECT  materials.name AS Name, materials.suppliername AS Brand,
        storage_areas.location AS Location, 
        jobsites.jobsitename AS Jobsite, 
        stored_in.amount AS Amount
        FROM materials
        JOIN stored_in
        ON materials.materialid = stored_in.materialid
        JOIN storage_areas
        ON storage_areas.storageareaid = stored_in.storageareaid
        JOIN jobsites
        ON jobsites.jobsiteid = storage_areas.jobsiteid
        ORDER BY materials.name
        LIMIT :limit OFFSET :offset;`,
  },

  "lowest amounts": {
    query: `SELECT * FROM materials ORDER BY totalavailable ASC LIMIT :limit OFFSET :offset;`,
  },

  subordinates: {
    query: `SELECT * FROM materials ORDER BY totalavailable ASC LIMIT :limit OFFSET :offset;`,
  },

  employees: {
    count: `SELECT COUNT(*) AS Count
        FROM (
          SELECT DISTINCT emp1.empid AS EmpID, emp1.fname AS Fname, emp1.lname AS Lname, emp1.title AS Title,
          CONCAT(emp2.fname, ' ', emp2.lname) AS Supervisor, emp2.empid AS SupervisorID, JobsiteName, emp1.JobsiteID AS JobsiteID
          FROM employees as emp1
          LEFT JOIN employees as emp2
          ON emp1.supervisorid = emp2.empid
          LEFT JOIN Jobsites
          ON emp1.JobsiteID = Jobsites.JobsiteID
          ORDER BY emp1.empid ASC
        ) AS Result;`,
    query: `SELECT DISTINCT emp1.empid AS EmpID, emp1.fname AS Fname, emp1.lname AS Lname, emp1.title AS Title,
        CONCAT(emp2.fname, ' ', emp2.lname) AS Supervisor, emp2.empid AS SupervisorID, JobsiteName, emp1.JobsiteID AS JobsiteID
        FROM employees as emp1
        LEFT JOIN employees as emp2
        ON emp1.supervisorid = emp2.empid
        LEFT JOIN Jobsites
        ON emp1.JobsiteID = Jobsites.JobsiteID
        ORDER BY emp1.empid ASC
        LIMIT :limit OFFSET :offset;`,
  },

  Jobsites: {
    count: `SELECT COUNT(*) AS Count
        FROM (
          SELECT jobsites.JobsiteID, jobsites.JobsiteName AS Jobsite, 
          CONCAT(employees.fname, ' ', employees.lname) AS Supervisor, employees.empid AS SupervisorID
          FROM jobsites 
          LEFT JOIN employees ON jobsites.jobsiteid = employees.jobsiteid 
          AND employees.Title = 'Site Supervisor'
        ) AS Result;`,
    query: `SELECT jobsites.JobsiteID, jobsites.JobsiteName AS Jobsite, 
        CONCAT(employees.fname, ' ', employees.lname) AS Supervisor, employees.empid AS SupervisorID
        FROM jobsites 
        LEFT JOIN employees ON jobsites.jobsiteid = employees.jobsiteid 
        AND employees.Title = 'Site Supervisor'
        LIMIT :limit OFFSET :offset;`,
  },

  Storages_Areas: {
    count: `SELECT COUNT(*) AS Count
        FROM (
          SELECT SA.StorageAreaID, SA.Location, Jobsites.JobsiteName, SA.JobsiteID, SA.Length, SA.Width, SA.Height, SA.TotalStored, SA.is_Container
          FROM Storage_Areas AS SA
          LEFT JOIN Jobsites ON SA.JobsiteID = Jobsites.JobsiteID
          ORDER BY SA.JobsiteID ASC
        ) AS Result;`,
    query: `SELECT SA.StorageAreaID, SA.Location, Jobsites.JobsiteName, SA.JobsiteID, SA.Length, SA.Width, SA.Height, SA.TotalStored, SA.is_Container
        FROM Storage_Areas AS SA
        LEFT JOIN Jobsites ON SA.JobsiteID = Jobsites.JobsiteID
        ORDER BY SA.JobsiteID ASC
        LIMIT :limit OFFSET :offset;`,
  },

  Stored_In: {
    count: `SELECT COUNT(*) AS Count
        FROM (
          SELECT SA.StorageAreaID,  SA.Location,  J.JobsiteID,  J.JobsiteName,  M.MaterialID,  M.Name,  M.MaterialType,  SI.Amount
          FROM Stored_In SI
          JOIN Storage_Areas SA ON SI.StorageAreaID = SA.StorageAreaID
          JOIN Materials M ON SI.MaterialID = M.MaterialID
          JOIN Jobsites J ON SA.JobsiteID = J.JobsiteID
          ORDER BY SA.JobsiteID ASC
        ) AS Result;`,
    query: `SELECT SA.StorageAreaID, SA.Location, J.JobsiteID, J.JobsiteName, M.MaterialID, M.Name, M.MaterialType, SI.Amount
         FROM Stored_In SI
         JOIN Storage_Areas SA ON SI.StorageAreaID = SA.StorageAreaID
         JOIN Materials M ON SI.MaterialID = M.MaterialID
         JOIN Jobsites J ON SA.JobsiteID = J.JobsiteID
         ORDER BY SA.JobsiteID ASC
         LIMIT :limit OFFSET :offset;`,
  },
};

module.exports = tables;
