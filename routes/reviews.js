const express = require('express');
const router=express.Router({mergeParams:true});

const Campground = require('../models/campground');
const Review = require('../models/review');

const {reviewSchema} = require('../schemas');

const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');


const validateReview = (req,res,next)=>{
    const {error} =reviewSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg,400)
    }
    else{
        next();
    }
}


router.post('/', validateReview ,catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success','Created a review!')
    res.redirect(`/campgrounds/${req.params.id}`);
}))
router.delete('/:revId',catchAsync(async(req,res)=>{
    const {id,revId} = req.params;
    await Review.findByIdAndDelete(revId);
    await Campground.findByIdAndUpdate(id,{$pull : {reviews:revId}});
    req.flash('success','Successfully deleted a review!')
    res.redirect(`/campgrounds/${id}`)
}))

module.exports = router;
