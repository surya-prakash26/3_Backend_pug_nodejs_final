const express = require("express");
const path = require('path');
const app = express();
var mongoose = require('mongoose');
const bodyparser = require('body-parser'); //post via express(not used here)
mongoose.connect('mongodb://localhost/contactdance',{useNewUrlParser: true})
port = 4800
// Defining mongoose schema
var contactschema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
});

var contact = mongoose.model('contact',contactschema)

// Express Related
app.use('/static', express.static('static')) // for serving static files
app.use(express.urlencoded())

// PUG Related
app.set('view engine','pug') // set the template engine as pug
app.set('views', path.join(__dirname ,'views')) // set the views directory 

// End points 
app.get("/", (req,res)=>{
    const params = {}
    res.status(200).render('home.pug',params)
});
app.get("/contact", (req,res)=>{
    const params = {}
    res.status(200).render('contact.pug',params)
});

app.post("/contact", (req,res)=>{
    var myData = new contact(req.body);
    myData.save().then(()=>{
        res.send('Data has been submitted sucesfully')
    }).catch(()=>{
        res.status(400).send('Data has not saved')
    });
    // res.status(200).render('contact.pug')
});

// Start the server 
app.listen(port, ()=>{
    console.log(`This app is sucesfully running on port ${port}`)
});
