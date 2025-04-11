require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const notFound = require('./middleware/notFound');
const credentials = require('./middleware/credentials');
const mongoose = require('mongoose');
const connectDB = require('./config/dbCon');

const corsOptions = require('./config/corsOptions');

// connect to MongoDb
connectDB();

const app = express();
const PORT = process.env.PORT || 3500;

// custom middleware logger
app.use(logger);

// handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

// middleware for cookies
app.use(cookieParser());

// serve statice files
app.use(express.static(path.join(__dirname, '/public')));

app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

app.use(verifyJWT);
app.use('/users', require('./routes/api/user'));
app.use('/employees', require('./routes/api/employees'));

app.use(notFound);

app.use(errorHandler);
mongoose.connection.once('open', () => {
  console.log('Connected to mongodb');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
