const sql = require("./index.js");

const Employee = function (employee) {
  this.first_name = employee.first_name;
  this.last_name = employee.last_name;
  this.password = employee.password;
  this.birthdate = employee.birthdate;
  this.employee_id = employee.employee_id;
  this.manager_id = employee.manager_id;
  this.email = employee.email;
};

// This is the SQL statement that inserts an employee into the database, but it uses an object. 

Employee.create = (newEmployee, result) => {
  sql.query("INSERT INTO employees SET ?", newEmployee, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newEmployee });
  });
};

Employee.findById = (employee_id, result) => {
  sql.query(`SELECT * FROM employees WHERE employee_id = ${employee_id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      result(null, res[0]);
      return;
    }
    // no employee exists with the id
    result({ kind: "no employee exits with this id" }, null);
  });
};

Employee.findByEmail = (email, result) => {
  sql.query(`SELECT * FROM employees WHERE email = '${email}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      result(null, res[0]);
      return;
    }
    // no employee exists with the id
    result({ kind: "no employee exits with this email" }, null);
  });
};


Employee.getAll = (employee_id, result) => {
  let query = "SELECT * FROM employees";
  if (employee_id) {
    query += ` WHERE employee_id LIKE '%${employee_id}%'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

Employee.remove = (employee_id, result) => {
  sql.query("DELETE FROM employees WHERE employee_id = ?", employee_id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "no employee exists with this id" }, null);
      return;
    }
    result(null, res);
  });
};

Employee.updateManagerID = (employee_id, manager_id, employee, result) => {
  sql.query(
    "UPDATE employees SET manager_id = ? WHERE employee_id = ?",
    [manager_id, employee_id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // No employee found with this employee_id
        result({ kind: "No employee found with this employee_id" }, null);
        return;
      }
      result(null, { employee_id });
    }
  );
};

module.exports = Employee;