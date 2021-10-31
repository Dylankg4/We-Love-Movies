const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const criticDetail = mapProperties({
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
  });

function update(review){
    return knex("reviews")
    .select("*")
    .insert(review, "*")
    .where({ review_id: review.review_id})
    .update(review)
}

function read(reviewId){
    return knex("reviews")
    .where({ review_id: reviewId })
    .first();
}

async function getCritic(reviewId){
    const result = await knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("*")
    .where({ review_id: reviewId })
    .first();
    const updated = criticDetail(result);
    return updated;
}

function destroy(reviewId){
return knex("reviews")
.where({ review_id: reviewId})
.del()
}

module.exports = {
    update,
    read,
    getCritic,
    destroy,
}