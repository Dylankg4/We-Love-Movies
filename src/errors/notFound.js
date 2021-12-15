function notFound(req, res, next) {
    next({ status: 404, message: `Path not found: ${req.originalUrl}. Add to url - /movies, /movies/:movieId, /movies/:movieId/theaters, /movies/:movieId/reviews, /theaters, /reviews, /reviews/:reviewId` });
  }
  
  module.exports = notFound;