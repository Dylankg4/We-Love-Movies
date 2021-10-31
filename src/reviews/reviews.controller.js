const service = require("./reviews.service")
const asyncError = require("../errors/asyncErrorBoundary")

async function isValid(req, res, next){
    const { reviewId } = req.params
    const data = await service.read(reviewId)
    if(!data){
        return next({
            status: 404,
            message: "Review cannot be found",
        })
    }
    res.locals.review = data
    return next()
}

async function update(req,res){
    const review = {...res.locals.review, ...req.body.data}
    await service.update(review)
    const data = await service.getCritic( res.locals.review.review_id )
    res.json({ data: data })
}

async function destroy(req, res){
    await service.destroy(res.locals.review.review_id)
    res.sendStatus(204)
}

module.exports = {
    update: [asyncError(isValid), asyncError(update)],
    delete: [asyncError(isValid), asyncError(destroy)],
}