module.exports = app => {
    const employees = require("../controllers/employee.controller.js");
    var router = require("express").Router();

    // This is the function that is applied when this route is accessed. It has to be /api.

    router.post("/", employees.create);

    router.get("/", employees.findAll);

    router.get("/id/:employee_id", employees.findOne);

    router.get("/email/:email", employees.findEmail);

    router.put("/:employee_id/:manager_id", employees.update);

    router.delete("/:employee_id", employees.delete);

    app.use('/api/employees', router);


};