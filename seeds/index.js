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
        const price = Math.floor(Math.random()*20)+10;
        const camp= new Campground({
            author : '66e3387ddccb4026d8e5bb62',
            location : `${cities[rand1000].city}, ${cities[rand1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image:`https://picsum.photos/400?random=${Math.random}`,
            description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis magnam possimus, error iste porro vero quaerat voluptate voluptates. Natus facilis quidem nihil obcaecati earum voluptates laudantium rem ullam. Consectetur, veniam.',
            price,
            images: [
                {
                  url: 'https://res.cloudinary.com/do4ylceyd/image/upload/v1727539941/YelpCamp/exbt5drzsioy4auvpcpa.jpg',
                  filename: 'YelpCamp/exbt5drzsioy4auvpcpa'
                },
                {
                  url: 'https://res.cloudinary.com/do4ylceyd/image/upload/v1727539944/YelpCamp/ayhvi1zcwwvjcsbovkxs.jpg',
                  filename: 'YelpCamp/ayhvi1zcwwvjcsbovkxs'
                }
              ],
        })
        await camp.save();
    }
}

seedDb().then(()=>{
    mongoose.connection.close();
});