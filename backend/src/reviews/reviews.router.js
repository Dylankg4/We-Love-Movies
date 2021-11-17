const router = require("express").Router({ mergeParams: true });
const controller = require("./reviews.controller")
const notAllowed = require("../errors/methodNotAllowed")

router
.route("/:reviewId")
.put(controller.update)
.delete(controller.delete)
.all(notAllowed)


module.exports = router