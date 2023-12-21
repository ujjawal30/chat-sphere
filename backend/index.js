const express = require('express');
const dotenv = require('dotenv');

dotenv.config({path: './.env.local'});

const PORT = process.env.PORT || 5000
const app = express();

app.get('/', (req, res) => {
  res.send("Hi there, Welcome to my first app!!");
})

app.listen(PORT, console.log(`Server is listening at PORT ${PORT}`));