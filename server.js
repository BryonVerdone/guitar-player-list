const { request } = require('express');
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
    .sort({ likes: -1 })
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
      likes: 0,
    })
    .then((result) => {
      console.log('Player Added');
      res.redirect('/');
      console.log(result);
    })
    .catch((error) => console.error(error));
});

app.put('/addOneLike', (req, res) => {
  db.collection('guitarPlayers')
    .updateOne(
      {
        playerName: req.body.playerNameS,
        playerGuitar: req.body.playerGuitarS,
        likes: req.body.likesS,
      },
      {
        $set: {
          likes: req.body.likesS + 1,
        },
      },
      {
        sort: { _id: -1 },
        upsert: true,
      }
    )
    .then((result) => {
      console.log('Added one like');
      res.json('Like Added');
    })
    .catch((error) => console.error(error));
});

app.delete('/deleteGuitarPlayer', (req, res) => {
  db.collection('guitarPlayers')
    .deleteOne({
      playerName: req.body.playerNameS,
    })
    .then((result) => {
      console.log('Player Deleted');
      res.json('Player Deleted');
    })
    .catch((err) => console.error(err));
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
