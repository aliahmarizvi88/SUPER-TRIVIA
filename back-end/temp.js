require('dotenv').config();
const express = require('express');
const scoreRoute = require('./routes/scoreRoute');
const { connectDB } = require('./connection');
const cors = require('cors');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDB(process.env.MONGO_URI)
  .then(() => console.log('DB CONNECTION SUCCESSFUL'))
  .catch((err) => console.log(`${err}, DB CONNECTION UNSUCCESSFUL`));

app.use('/api', scoreRoute);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
