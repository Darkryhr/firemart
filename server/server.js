const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');

const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoute');

dotenv.config({ path: './config.env' });

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

app.use('/users', userRouter);
app.use('/products', productRouter);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
