const mongoose = require('mongoose');
const {places,descriptors} = require('./seedHelpers');
const cities = require('./cities');
const Campground = require('../models/campground');


mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
.then(() => {
    console.log('Mongo Connection On');
})
.catch((err) => {
    console.log("Oh no mongo connection error!");
    console.log(err);
})

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDb = async () => {
    await Campground.deleteMany({});
    for( let i = 0 ; i<50 ; i++){
        const rand1000 = Math.floor(Math.random()*1000);
        const camp= new Campground({
            location : `${cities[rand1000].city}, ${cities[rand1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`
        })
        await camp.save();
    }
}

seedDb().then(()=>{
    mongoose.connection.close();
});