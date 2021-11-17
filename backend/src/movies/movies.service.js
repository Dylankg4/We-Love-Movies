const knex = require("../db/connection");

function list() {
  return knex("movies")
  .select("movies.*")
}

function showing() {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .select("m.movie_id", "m.title", "m.rating", "m.description", "m.image_url")
    .where({ "mt.is_showing": true })
    .groupBy("m.movie_id")
    .orderBy("m.movie_id");
}

function listTheaters(movieId){
    return knex("movies as mo")
    .join("movies_theaters as mt", "mo.movie_id", "mt.movie_id")
    .join("theaters as t", "t.theater_id", "mt.theater_id")
    .select("t.*", "mo.movie_id")
    .where({ "mo.movie_id": movieId })
}

function listReviews(movieId) {
  return knex("movies as m")
    .join("reviews as r", "m.movie_id", "r.movie_id")
    .where({ "m.movie_id": movieId });
}


function getCritic(critic){
    return knex("critics").where({ critic_id: critic})
}

function read(movieId) {
  return knex("movies as m")
    .where({ "m.movie_id": movieId })
}

module.exports = {
  list,
  read,
  showing,
  listTheaters,
  listReviews,
  getCritic,
};
