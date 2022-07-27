module.exports = app => {
    const manager_entry = require("../controllers/manager_entry.controller.js");
    var router = require("express").Router();

    // This is the function that is applied when this route is accessed. It has to be /api.

    router.post("/", manager_entry.create);

    router.get("/audits", manager_entry.findAudits);

    router.get("/specific/:entry_id", manager_entry.findSpecificLog);

    router.delete("/delete/:index", manager_entry.delete);


    app.use('/api/manager_entry', router);


};