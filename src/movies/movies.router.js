const router = require("express").Router({ mergeParams: true });
const controller = require("./movies.controller.js");
const notAllowed = require("../errors/methodNotAllowed");
const cors = require("cors");

router.use(cors())

router
.route("/:movieId/reviews")
.get(controller.review)
.all(notAllowed)

router
.route("/:movieId/theaters")
.get(controller.theaters)
.all(notAllowed)

router
.route("/:movieId")
.get(controller.read)
.all(notAllowed)

router.route("/")
.get(controller.list)
.all(notAllowed)


module.exports = router;