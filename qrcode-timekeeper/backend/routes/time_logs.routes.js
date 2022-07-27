module.exports = app => {
    const time_logs = require("../controllers/time_logs.controller.js");
    var router = require("express").Router();

    // This is the function that is applied when this route is accessed. It has to be /api.

    router.post("/", time_logs.create);

    // router.get("/", time_logs.findAll);

    router.get("/id/:employee_id", time_logs.findLog);

    router.get("/incomplete/id/:employee_id", time_logs.findIncompleteLog);


    router.get("/unapproved", time_logs.unapproved);
  
    router.get("/incomplete/all", time_logs.findIncompleteLogs);

    router.put("/:log_id/:clock_out/:hours/:is_incomplete", time_logs.update);

    router.put("/update/:log_id/:clock_in/:clock_out/:hours", time_logs.updateFromAudit);

    // router.delete("/:employee_id", time_logs.delete);

    router.get("/table/:employee_id", time_logs.findLogForTable);

    router.get("/specific/:entry_id", time_logs.findSpecificLog);

    router.get("/incomplete/specific/:id", time_logs.getSpecificIncompleteLog);

    app.use('/api/time_logs', router);


};