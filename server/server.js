const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');
const galleryRouter = require('./routes/imgRoute');
const cartRouter = require('./routes/cartRoutes');

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

app.use(cors());

app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/cart', cartRouter);

mongoose.connect(DB).then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
