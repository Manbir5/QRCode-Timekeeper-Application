module.exports = app => {
    const managers_info = require("../controllers/managers_info.controller.js");
    var router = require("express").Router();

    // This is the function that is applied when this route is accessed. It has to be /api.

    router.post("/", managers_info.create);

    router.get("/", managers_info.findAll);

    router.get("/id/:manager_id", managers_info.findOne);

    router.delete("/:manager_id", managers_info.delete);

    app.use('/api/managers_info', router);

};
