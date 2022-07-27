const TimeLog = require("../models/time_logs.model.js");

// The below function creates a new Time Log and saves it in the database.

exports.create = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Incorrect entry"
    });
  }
  // Create a Time Log
  const time_log = new TimeLog({
    employee_id: req.body.employee_id,
    date: req.body.date,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    hours: req.body.hours,
    clock_in: req.body.clock_in,
    clock_out: req.body.clock_out,
    is_approved: req.body.is_approved,
    is_incomplete: req.body.is_incomplete,
  });
  // Save Time Log in the database
  TimeLog.create(time_log, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating a time log."
      });
    else res.send(data);
  });
};

// exports.findAll = (req, res) => {
//   const employee_id = req.query.employee_id;
//   Employee.getAll(employee_id, (err, data) => {
//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving employees."
//       });
//     else res.send(data);
//   });
// };

exports.findLog = (req, res) => {
  TimeLog.findById(req.params.employee_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No employee found with this employee_id ${req.params.employee_id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Employee with id " + req.params.employee_id
        });
      }
    } else res.send(data);
  });
};

exports.unapproved = (req, res) => {
  TimeLog.findUnapproved((err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No Unapproved Time Logs Found.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Unapproved Time Logs"
        });
      }
    } else res.send(data);
  });
};

exports.findIncompleteLog = (req, res) => {
  TimeLog.findIncomplete(req.params.employee_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No employee found with this employee_id ${req.params.employee_id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Employee with id " + req.params.employee_id
        });
      }
    } else res.send(data);
  });
};

exports.findIncompleteLogs = (req, res) => {
  TimeLog.findAllIncomplete((err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No Incomplete log found.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Incomplete Logs."
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  TimeLog.updateLog(
    req.params.log_id,
    req.params.clock_out,
    req.params.hours,
    req.params.is_incomplete,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `No employee was found with this employee_id ${req.params.log_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating employee with employee_id " + req.params.log_id
          });
        }
      } else res.send(data);
    }
  );
};

exports.updateFromAudit = (req, res) => {

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  TimeLog.updateLogFromAudit(
    req.params.log_id,
    req.params.clock_in,
    req.params.clock_out,
    req.params.hours,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `No employee was found with this employee_id ${req.params.log_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating employee with employee_id " + req.params.log_id
          });
        }
      } else res.send(data);
    }
  );
};

exports.findLogForTable = (req, res) => {
  TimeLog.findLogForTable(req.params.employee_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No employee found with this employee_id ${req.params.employee_id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Employee with id " + req.params.employee_id
        });
      }
    } else res.send(data);
  });
};

exports.findSpecificLog = (req, res) => {
  TimeLog.findSpecificLog(req.params.entry_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No time log found with this entry_id ${req.params.entry_id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving table log with id " + req.params.entry_id
        });
      }
    } else res.send(data);
  });
};

exports.getSpecificIncompleteLog = (req, res) => {
  TimeLog.getSpecificIncompleteLog(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No employee found with this entry_id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving employee with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};


// exports.delete = (req, res) => {
//   Employee.remove(req.params.employee_id, (err, data) => {
//     if (err) {
//       if (err.kind === "not_found") {
//         res.status(404).send({
//           message: `No employee was found with this employee_id ${req.params.employee_id}.`
//         });
//       } else {
//         res.status(500).send({
//           message: "Could not delete employee with employee_id " + req.params.employee_id
//         });
//       }
//     } else res.send({ message: `Employee was deleted successfully!` });
//   });
// };