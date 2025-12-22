const tables = {
  leadership: {
    count: `SELECT COUNT(*) AS Count
        FROM ( SELECT DISTINCT emp1.empid AS EmpID, CONCAT(emp1.fname, ' ', emp1.lname) AS Name, emp1.title AS Title
            FROM employees AS emp1
            JOIN employees AS emp2 ON emp2.supervisorid = emp1.empid
        ) AS Result;`,
    query: `SELECT DISTINCT emp1.empid AS EmpID, CONCAT(emp1.fname, ' ', emp1.lname) AS Name, emp1.title AS Title
        FROM employees as emp1
        JOIN employees as emp2
        ON emp2.supervisorid = emp1.empid;`,
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
        ON employees.jobsiteid = jobsites.jobsiteid;`,
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
        ORDER BY materials.name;`,
  },
};

module.exports = tables;
