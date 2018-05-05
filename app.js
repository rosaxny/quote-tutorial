'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient;

let db;

app.set('view engine', 'ejs');

MongoClient.connect('mongodb://dbuser:dbpassword@ds215370.mlab.com:15370/quotes-wd', (err, database) => {
	db = database.db('quotes-wd');
	app.listen(8080, function() {
		console.log('listen on 8080');
	});
});

app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req, res) {
	db.collection('quotes').find().toArray((err, result) => {
		if (err) { return console.log(err);}
		res.render('index.ejs', {quotes: result});
	});
	
});

app.post('/quotes', (req, res) => {
	db.collection('quotes').save(req.body, (err, result) => {
		if(err) { return console.log(err);}
		console.log('saved to db!');
		res.redirect('/');
	});
});

