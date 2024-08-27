const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campground');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
.then(() => {
    console.log('Mongo Connection On');
})
.catch((err) => {
    console.log("Oh no mongo connection error!");
    console.log(err);
})

// mongoose.connect('mongodb://localhost:27017/yelp-camp',{
//     useNewUrlParams: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true
// })
// const db=mongoose.connection;
// db.on('error',console.error.bind(console,"connection error:"));
// db.once("open",()=>{
//     console.log("Database Connected");
// })


app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'))

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/makeCampground', async (req, res) => {
    const camp= new Campground ({title : 'My Backyard',description:'Cheap Camping!!'});
    await camp.save();
    res.send(camp); 
})

app.listen(3000, ()=>{
    console.log('Serving on Port 3000');
})