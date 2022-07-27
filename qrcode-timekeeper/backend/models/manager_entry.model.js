const sql = require("./index.js");

const ManagerEntry = function (manager_entry) {
  this.id_for_employee = manager_entry.id_for_employee;
  this.date = manager_entry.date;
  this.employee_first_name = manager_entry.employee_first_name;
  this.employee_last_name = manager_entry.employee_last_name;
  this.hours = manager_entry.hours;
  this.edited_hours = manager_entry.edited_hours;
  this.original_clock_in = manager_entry.original_clock_in;
  this.original_clock_out = manager_entry.original_clock_out;
  this.edited_clock_in = manager_entry.edited_clock_in;
  this.edited_clock_out = manager_entry.edited_clock_out;
  this.entry_id = manager_entry.entry_id;
  this.manager_id = manager_entry.manager_id;
};

// This is the SQL statement that inserts a time log into the database, but it uses an object. 

ManagerEntry.create = (newEntry, result) => {
  sql.query("INSERT INTO managers SET ?", newEntry, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created manager entry: ", { id: res.insertId, ...newEntry });
    result(null, { id: res.insertId, ...newEntry });
  });
};

ManagerEntry.findAllAudits = (result) => {
  sql.query(`SELECT * FROM managers`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("employee: ", res);
      result(null, res);
      return;
    }
    // no employee exists with the id
    result({ kind: "no employee exits with this id" }, null);
  });
};

ManagerEntry.findSpecificLog = (entry_id, result) => {
  sql.query("SELECT * FROM managers WHERE `index` = ?" , entry_id , (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res) {
      result(null, res);
      return;
    }
    // no time log exists with the id
    result({ kind: "no time log exits with this id" }, null);
  });
};

ManagerEntry.remove = (index, result) => {
  sql.query("DELETE FROM managers WHERE `index` = ?", index, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "no employee exists with this index" }, null);
      return;
    }
    result(null, res);
  });
};

module.exports = ManagerEntry;