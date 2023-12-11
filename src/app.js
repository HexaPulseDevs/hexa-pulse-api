
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet'); 
const hpp = require('hpp'); 
const sanitizater = require('perfect-express-sanitizer');

const AppError = require('./utils/appError');
const globalErrorHander = require('./controllers/error.controller');

//routes
const imagesRoutes = require('./routes/images.route');
const membersRoutes = require('./routes/members.route'); //
const authRoutes = require('./routes/auth.route');

//============
const boom = require("@hapi/boom");

const app = express();

const whiteList = [];
const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(boom.unauthorized());
    }
  },
};

app.use(cors(options));


app.get("/", (req, res) => {
  return res.send("I am a HOME");
});


const limiter = rateLimit({
  max: 10000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});

app.use(express.json());

app.use(helmet());
app.use(hpp());
app.use(
  sanitizater.clean({
    xss: true,
    noSql: true,
    sql: false, 
  })
);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}


app.use('/api/v1', limiter);

//routes
app.use('/api/v1/images', imagesRoutes);
app.use('/api/v1/members', membersRoutes);    
app.use('/api/v1/auth', authRoutes);


app.all('*', (req, res, next) => {
  return next(
    new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
  );
});

app.use(globalErrorHander);

module.exports = app;


