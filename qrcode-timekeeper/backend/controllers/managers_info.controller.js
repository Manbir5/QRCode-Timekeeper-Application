const ManagersInfo = require("../models/managers_info.model.js");

// The below function creates a new Manager and saves it in the database.

exports.create = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Incorrect entry"
    });
  }
  // Create a manager
  const managers_info = new ManagersInfo({
    manager_first_name: req.body.manager_first_name,
    manager_last_name: req.body.manager_last_name,
    manager_id: req.body.manager_id,
  });
  // Save Manager in the database
  ManagersInfo.create(managers_info, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating a manager."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const manager_id = req.query.manager_id;
  ManagersInfo.getAll(manager_id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving managers."
      });
    else res.send(data);
  });
};

exports.delete = (req, res) => {
  ManagersInfo.remove(req.params.manager_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No employee was found with this manager_id ${req.params.manager_id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete employee with manager_id " + req.params.manager_id
        });
      }
    } else res.send({ message: `Manager was deleted successfully!` });
  });
};

exports.findOne = (req, res) => {
  ManagersInfo.findById(req.params.manager_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No manager found with this manager_id ${req.params.manager_id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Manager with id " + req.params.manager_id
        });
      }
    } else res.send(data);
  });
};