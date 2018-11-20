// Load modules
const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

//connect to MongoURI exported from external file
const keys = require('./config/keys');

// initialize application
const app = express();

//setup template engine
app.engine('handlebars',exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// setup static file to serve css, js and images
app.use(express.static('public'));

//conect to remote database
const options = {    
    server:{
        auto_reconnect: true,
        socketOptions:{
            connectTimeoutMS:3600000,
            keepAlive:3600000,
            socketTimeoutMS:3600000
        }
    }
  };

mongoose.connect(keys.MonogoURI, {useNewUrlParser: true})
.then(() => {
    console.log('Connected to remote database...');
}).catch((err) => {
    console.log(err);
});

// set environment variable or port
const port = process.env.PORT || 4000;

// Handle routes
app.get('/', (req,res) => {
    res.render('home');
});
app.get('/about', (req,res) => {
    res.render('about');
});
app.listen(port, () => {
    console.log('Server is Running on port' , port);
});

