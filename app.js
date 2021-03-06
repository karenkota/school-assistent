// server
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const hbs = require('hbs');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch((err) => {
    throw new Error(err);
  });

const app = express();

app.use(session({
  secret: 'school-assistent-auth',
  cookie: { maxAge: 3000000 },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60, // 1 day
  }),
  proxy: true,
  resave: true,
  saveUninitialized: true,
}));

// Static route setup
app.use(express.static('public'));

// Body & Cokkie Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// HBS - Express View engine setup
app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);
hbs.registerPartials(`${__dirname}/views/partials`);

const index = require('./routes/index');

app.use('/', index);

const panel = require('./routes/auth/panel');

app.use('/panel', panel);

const teacher = require('./routes/teacher/rates');

app.use('/teacher', teacher);

module.exports = app;

app.listen(process.env.PORT, () => console.log('use port: 3000'));
