const ManagerEntry = require("../models/manager_entry.model.js");

// The below function creates a new Time Log and saves it in the database.

exports.create = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Incorrect entry"
    });
  }
  // Create a manager entry
  const manager_entry = new ManagerEntry({
    id_for_employee: req.body.id_for_employee,
    date: req.body.date,
    employee_first_name: req.body.employee_first_name,
    employee_last_name: req.body.employee_last_name,
    hours: req.body.hours,
    edited_hours: req.body.edited_hours,
    original_clock_in: req.body.original_clock_in,
    original_clock_out: req.body.original_clock_out,
    edited_clock_in: req.body.edited_clock_in,
    edited_clock_out: req.body.edited_clock_out,
    manager_id: req.body.manager_id,
    entry_id: req.body.entry_id,
  });
  // Save a manager entry in the database
  ManagerEntry.create(manager_entry, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating a manager entry."
      });
    else res.send(data);
  });
};

exports.findAudits = (req, res) => {
  ManagerEntry.findAllAudits((err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No Audits Found.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Audits"
        });
      }
    } else res.send(data);
  });
};

exports.findSpecificLog = (req, res) => {
  ManagerEntry.findSpecificLog(req.params.entry_id, (err, data) => {
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

exports.delete = (req, res) => {
  ManagerEntry.remove(req.params.index, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No employee was found with this employee_id ${req.params.employee_id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete employee with employee_id " + req.params.employee_id
        });
      }
    } else res.send({ message: `Employee was deleted successfully!` });
  });
};

