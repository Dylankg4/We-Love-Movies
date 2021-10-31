const { as } = require("../db/connection")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
const service = require("./movies.service")

const hasParams = async(req,res,next) =>{
  const {movieId} = req.params
  const match = await service.read(Number(movieId))
  if(match.length === 0 || !movieId){
    return next ({
      status: 404,
      message: "MovieId does not exist in the database"
    });
  }
  res.locals.movie = match[0]
  next()
}

const filterIsShowing = (req, res, next) =>{
  const show = req.query.is_showing
  res.locals.showing = show ? show: null;
  next()
}

async function list(req, res, next) {
  const data = res.locals.showing
    ? await service.showing()
    : await service.list();
  res.json({ data });
}

  async function read(req, res) {
    res.status(200).json({ data: res.locals.movie });
  }

async function listTheaters(req, res){
  const movieId = res.locals.movie.movie_id;
const data = await service.listTheaters(movieId)
res.json({ data: data })
}

async function listReviews(req, res) {
  const movieId = res.locals.movie.movie_id;
  const reviews = await service.listReviews(movieId);
  const allReviews = [];
  for (let i = 0; i < reviews.length; i++) {
    const review = reviews[i];
    const critic = await service.getCritic(review.critic_id);
    review.critic = critic[0];
    allReviews.push(review);
  }
  res.status(200).json({ data: allReviews });
}

module.exports = {
    list: [filterIsShowing, asyncErrorBoundary(list)],
    read: [asyncErrorBoundary(hasParams),asyncErrorBoundary(read)],
    theaters: [asyncErrorBoundary(hasParams),asyncErrorBoundary(listTheaters)],
    review: [asyncErrorBoundary(hasParams), asyncErrorBoundary(listReviews)]
}