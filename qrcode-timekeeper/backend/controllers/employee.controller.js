const Employee = require("../models/employee.model.js");
const bcrypt = require('bcrypt');


// The below function creates a new Employee and saves it in the database.

exports.create = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Incorrect entry"
    });
  }
  // Create a Employee
  const saltRounds = 10;
  const encryt_password = await bcrypt.hash(req.body.password, saltRounds)
  const employee = new Employee({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: encryt_password,
    birthdate: req.body.birthdate,
    manager_id: req.body.manager_id,
    email: req.body.email
  });
  // Save Employee in the database
  Employee.create(employee, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating an employee."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const employee_id = req.query.employee_id;
  Employee.getAll(employee_id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving employees."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Employee.findById(req.params.employee_id, (err, data) => {
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

exports.findEmail = (req, res) => {
  Employee.findByEmail(req.params.email, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No employee found with this email ${req.params.email}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Employee with email " + req.params.email
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
  Employee.updateManagerID(
    req.params.employee_id,
    req.params.manager_id,
    new Employee(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `No employee was found with this employee_id ${req.params.employee_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating employee with employee_id " + req.params.employee_id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Employee.remove(req.params.employee_id, (err, data) => {
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