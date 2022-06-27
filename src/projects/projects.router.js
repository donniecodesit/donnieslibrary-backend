const methodNotAllowed = require("../errors/methodNotAllowed");
const router = require("express").Router();
const controller = require("./projects.controller");

router.route("/")
    .get(controller.list)
    .post(controller.create)
    .all(methodNotAllowed);

router.route("/:id")
    .get(controller.read)
    .all(methodNotAllowed);

module.exports = router;