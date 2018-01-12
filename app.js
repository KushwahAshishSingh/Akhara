var express = require('express');
const MongoClient = require('mongodb').MongoClient;
const multer = require('multer');
const db = require('./config/db');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('hbs');
const fs = require('fs');
const app = express();



//const port = process.env.PORT || 3000;
const port = 8000;

hbs.registerPartials(__dirname + '/views/partials');   // ll auto relocate the request to the specified path.

app.set('view engine', 'hbs');   // setting hbs as the view engine.

app.use(express.static(__dirname + '/public'));   // making something static in the project like html and css.
app.use('/uploads', express.static('uploads'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});


app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}; ${req.method} ${req.url}`;  // for getting the current time and date, and also the url and request page

  console.log(log);
  fs.appendFile('server.log', log + '\n')    // it will create the log file and maintain the log record
  next();
});



// app.use((req, res, next) => { res.render('maintenance.hbs'); });    // this ll stop all other req under it and only display the maintenance page

// app.listen(port, () => {
//   console.log('we are live on server' + port)
// });



MongoClient.connect(db.url, (err, database) => {
    if (err) return console.log(err);
require('./app/routes')(app, database);

app.listen(port, () => {
    console.log('We are live on ' + port);
});
});












app.get('welcome', (req, res) => {
    app.render('welcome.hbs', {
        Title: 'akhara',
})
})

app.get('/About', (req, res) => {
  res.render('About.hbs', {
    PageTitle: 'Akhara',

})
})

app.get('/Contact', (req, res) => {
    res.render('Contact.hbs', {
    ContactDetails: '8560870586',

})
})

app.get('/Home', (req, res) => {
    res.render('Home.hbs', {
    welcomeMessage: 'welcome to our website',

})
})

app.get('/Photos', (req, res) => {
    res.render('Photos.hbs', {
    PhotoDetails: 'these photograps are belongs to our members',

})
})

app.get('/Videos', (req, res) => {
    res.render('Videos.hbs', {
    VideoDetails: 'these videos are belong to our members',

})
})

app.get('/RulesBook', (req, res) => {
    res.render('RulesBook.hbs', {
    RulesBook: 'the current Rule Book is lited below',

})
})

app.get('/Login', (req, res) => {
    res.render('Login.hbs', {
    login: 'this is login page',

})
})

app.get('/Search', (req, res) => {
    res.render('Search.hbs', {
    searchPage: 'search page',

})
})

app.get('/Location', (req, res) => {
    res.render('Location.hbs', {
    Locations: 'the current location is jaipur',

})
})

app.get('/Membership', (req, res) => {
    res.render('Membership.hbs', {
    RegistrationDetails: 'the Membership page also include registration ',

})
})





app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
