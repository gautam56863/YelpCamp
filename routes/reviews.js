const express = require('express');
const router=express.Router({mergeParams:true});
const {validateReview, isLoggedIn , isReviewAuthor} = require('../middleware');

const Campground = require('../models/campground');
const Review = require('../models/review');


const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');


router.post('/', isLoggedIn, validateReview ,catchAsync(async (req, res) => {
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
}))
router.delete('/:revId',isLoggedIn, isReviewAuthor,catchAsync(async(req,res)=>{
    const {id,revId} = req.params;
    await Review.findByIdAndDelete(revId);
    await Campground.findByIdAndUpdate(id,{$pull : {reviews:revId}});
    req.flash('success','Successfully deleted a review!')
    res.redirect(`/campgrounds/${id}`)
}))

module.exports = router;
