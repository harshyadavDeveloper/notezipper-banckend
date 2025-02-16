const express = require('express');
const connectDB = require('./utils/dbconfig');
const userRouter = require('./routes/userRoutes');
const notesRouter = require('./routes/noteRoutes');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const { notFound, errorHandler } = require('./middlewares/error-middleware');

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(cors({
    origin: '*', // Replace with your frontend's origin
  }));

// Middleware to parse JSON
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send('Hello 2.0 World!');
});

app.use('/api/user', userRouter);
app.use('/api/notes', notesRouter)



app.use(notFound);
app.use(errorHandler);
connectDB().then(() => {
    app.listen(5000, () => {
        console.log('Server is running on port 5000');
    });
});



//  login: http://localhost:5000/api/user/login
//  register: http://localhost:5000/api/user/register
