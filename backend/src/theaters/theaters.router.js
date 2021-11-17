const router = require("express").Router({ mergeParams: true });
const controller = require("./theaters.controller")
const notAllowed = require("../errors/methodNotAllowed");
const cors = require("cors");

router.use(cors())

router
.route("/")
.get(controller.list)
.all(notAllowed)

module.exports = router
