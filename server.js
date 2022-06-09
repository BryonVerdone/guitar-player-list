const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const PORT = 8000;

let dbConnectionStr = process.env.DB_STRING;

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true }).then(
  (client) => {
    console.log('Connected to Database');
  }
);
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
