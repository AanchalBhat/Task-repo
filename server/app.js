const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
require('./config/db');
const path = require("path");
const passport = require("passport");


const app = express();
app.use('/uploads', express.static('uploads'));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(passport.initialize());
require("./middlewares/passport")(passport);


//routes handlings;
const userRoutes = require("./routes/user");
app.use('/api', userRoutes );


module.exports = app;
