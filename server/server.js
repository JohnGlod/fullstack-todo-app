'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const todoRoute = require('./src/routes/todo.route');
const authRoute = require('./src/routes/auth.route');
const userRoute = require('./src/routes/user.route');

const apiMiddleware = require('./src/middlewares/apiError.middleware')
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use('/api', todoRoute);
app.use('/api', authRoute);
app.use('/api', userRoute);
app.use(apiMiddleware)

const main = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Example app listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error)
  }
};

main();
