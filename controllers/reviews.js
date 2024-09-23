const Campground = require('../models/campground');
const Review = require('../models/review');

module.exports.createReview = async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    // console.log(review);
    // console.log(campground);
    req.flash('success','Created a review!')
    res.redirect(`/campgrounds/${req.params.id}`);
}

module.exports.deleteReview = async(req,res)=>{
    const {id,revId} = req.params;
    await Review.findByIdAndDelete(revId);
    await Campground.findByIdAndUpdate(id,{$pull : {reviews:revId}});
    req.flash('success','Successfully deleted a review!')
    res.redirect(`/campgrounds/${id}`)
}