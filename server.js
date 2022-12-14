const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Configuring the database
// const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect('mongodb+srv://ahmad:ahmad123@cluster0-xzuwx.mongodb.net/test?retryWrites=true', {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Chat App application."});
});

// Routes
require('./routes/UserRoutes')(app)
require('./routes/MessageRoutes')(app)
require('./routes/GroupRoutes')(app)

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});