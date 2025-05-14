const express = require('express');
const scoreRoute = require('./routes/scoreRoute');
const { connectDB } = require('./connection');
const cors = require('cors');

const PORT = 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDB('mongodb://127.0.0.1:27017/trivia_db')
  .then(() => console.log('DB CONNCETION SUCCESSFULL'))
  .catch((err) => console.log(`${err}, DB CONNCETION UNSUCESSFULL`));

app.use('/api', scoreRoute);

app.listen(PORT, () => console.log(`CONNCETION SUCCESSFULL ${PORT}`));
