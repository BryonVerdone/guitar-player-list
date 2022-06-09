const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const PORT = 8000;
let db,
  dbConnectionStr = process.env.DB_STRING,
  dbName = 'guitarPlayers';

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true }).then(
  (client) => {
    console.log(`Connected to ${dbName} Database`);
    db = client.db(dbName);
  }
);
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  db.collection('guitarPlayers')
    .find()
    .toArray()
    .then((data) => {
      res.render('index.ejs', { info: data });
    })
    .catch((error) => console.error(error));
});
app.post('/addGuitarPlayer', (req, res) => {
  db.collection('guitarPlayers')
    .insertOne({
      playerName: req.body.playerName,
      playerGuitar: req.body.playerGuitar,
    })
    .then((result) => {
      console.log('Player Added');
      res.redirect('/');
      console.log(result);
    })
    .catch((error) => console.error(error));
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
