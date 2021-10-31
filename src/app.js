if (process.env.USER) require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();

//error handling
const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");

//routes
const moviesRouter = require("./movies/movies.router");
const theatersRouter = require("./theaters/theaters.router");
const reviewsRouter = require("./reviews/reviews.router")

app.use(cors())
app.use(express.json());

app.use("/reviews", reviewsRouter);
app.use("/theaters", theatersRouter);
app.use("/movies", moviesRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
