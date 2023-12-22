const express = require('express');
const dotenv = require('dotenv');

dotenv.config({path: './.env.local'});

const PORT = process.env.PORT || 5000
const app = express();

app.get('/api', (req, res) => {
  res.send({status: 200, page: 'Homepage'});
});

app.get('/api/chats', (req, res) => {
  res.send({status: 200, page: 'Chats Page'});
})

app.listen(PORT, console.log(`Server is listening at PORT ${PORT}`));