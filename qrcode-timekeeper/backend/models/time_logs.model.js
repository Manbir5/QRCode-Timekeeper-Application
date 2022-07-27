const sql = require("./index.js");

const TimeLog = function (time_log) {
  this.employee_id = time_log.employee_id;
  this.date = time_log.date;
  this.first_name = time_log.first_name;
  this.last_name = time_log.last_name;
  this.hours = time_log.hours;
  this.clock_in = time_log.clock_in;
  this.clock_out = time_log.clock_out;
  this.is_approved = time_log.is_approved;
  this.is_incomplete = time_log.is_incomplete;
  this.entry_id = time_log.entry_id;
};

// This is the SQL statement that inserts a time log into the database, but it uses an object. 

TimeLog.create = (newTimeLog, result) => {
  sql.query("INSERT INTO time_logs SET ?", newTimeLog, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newTimeLog });
  });
};

TimeLog.findById = (employee_id, result) => {
  sql.query(`SELECT * FROM time_logs WHERE employee_id = ${employee_id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      result(null, res[res.length - 1]);
      return;
    }
    // no employee exists with the id
    result({ kind: "no employee exits with this id" }, null);
  });
};

TimeLog.findUnapproved = (result) => {
  sql.query(`SELECT * FROM time_logs WHERE is_approved = 1`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      result(null, res);
      return;
    }
    // no employee exists with the id
    result({ kind: "no employee exits with this id" }, null);
  });
};

TimeLog.findIncomplete = (employee_id, result) => {
  sql.query(`SELECT COUNT(*) as total FROM time_logs WHERE employee_id = ${employee_id} AND is_incomplete = 1`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      result(null, res[res.length - 1]);
      return;
    }
    // no employee exists with the id
    result({ kind: "no employee exits with this id" }, null);
  });
};

TimeLog.findAllIncomplete = (result) => {
  sql.query(`SELECT * FROM time_logs WHERE is_incomplete = 1`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      result(null, res);
      return;
    }
    // no employee exists with the id
    result({ kind: "no employee exits with this id" }, null);
  });
};


TimeLog.updateLog = (log_id, clock_out, hours, is_incomplete) => {
  sql.query(
    `UPDATE time_logs SET hours = ?, clock_out = ?, is_incomplete = ? WHERE entry_id = ?`,
    [hours, clock_out, is_incomplete, log_id],
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
      // result(null, res);
    }
  );
};

TimeLog.updateLogFromAudit = (log_id, clock_in, clock_out, hours) => {
  sql.query(
    `UPDATE time_logs SET hours = ?, clock_in = ?, clock_out = ? WHERE entry_id = ?`,
    [hours, clock_in, clock_out, log_id],
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
    }
  );
};


TimeLog.findLogForTable = (employee_id, result) => {
  let query = `SELECT first_name, last_name, DATE_FORMAT(date,'%Y-%m-%d') as date, hours, entry_id FROM time_logs`;
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

TimeLog.findUnapproved = (result) => {
  sql.query(`SELECT * FROM time_logs WHERE is_approved = 0`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      result(null, res);
      return;
    }
    // no employee exists with the id
    result({ kind: "no employee exits with this id" }, null);
  });
};

TimeLog.findSpecificLog = (entry_id, result) => {
  sql.query(`SELECT hours, first_name, last_name, clock_in, clock_out, DATE_FORMAT(date,'%Y-%m-%d') as date, entry_id FROM time_logs WHERE entry_id = ${entry_id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      result(null, res[0]);
      return;
    }
    // no time log exists with the id
    result({ kind: "no time log exits with this id" }, null);
  });
};

TimeLog.getSpecificIncompleteLog = (id, result) => {
  sql.query(`SELECT hours, first_name, last_name, clock_in, clock_out, DATE_FORMAT(date,'%Y-%m-%d') as date, entry_id FROM time_logs WHERE employee_id = ${id} AND is_incomplete = 1`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      result(null, res[0]);
      return;
    }
    // no time log exists with the id
    result({ kind: "no employee exits with this id" }, null);
  });
};


module.exports = TimeLog;