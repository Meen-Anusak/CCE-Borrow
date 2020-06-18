const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cores = require('cors');
const mongoose = require('mongoose');
const config = require('./configs/evn');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

mongoose.connect(config.mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})

app.use(cores())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);

module.exports = app;