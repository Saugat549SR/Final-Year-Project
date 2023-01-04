require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connection = require('./database');
const userRoutes = require('./routes/userRoute');

const product = require('./routes/productRoute');
const errorMiddleware = require('./middleware/error');
const cookieParser = require('cookie-parser');

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// middleware for error
app.use(errorMiddleware);

//routes
app.use('/api/users', userRoutes);

app.use('/api/v1', product);

const port = process.env.PORT || 8080;
const server = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);

// unhandled promise rejection
process.on('unhandledRejection', (err) => {
  console.log(`Error:${err.message}`);
  console.log(`shutting down the server due to unhandled Promise Rejection`);
  server.close(() => {
    process.exit(1);
  });
});
