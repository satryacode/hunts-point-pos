var app 	= require('express')()
var server 	= require('http').Server(app)
var bodyParser = require('body-parser')
var Datastore = require('nedb')

app.use(bodyParser.json())

module.exports = app

// Database stuff
var inventoryDB = new Datastore({ 
	filename: './server/databases/inventory.db', 
	autoload: true 
})

// GET all inventory items
app.get('/', function (req, res) {
	res.send('Inventory API')
})

// GET all inventory items
app.get('/products', function (req, res) {

	inventoryDB.find({}, function (err, docs) {
		res.send(docs)
	})
})

// Create inventory product
app.post('/product', function (req, res) {

	var newProduct = req.body
	
	inventoryDB.insert(newProduct, function (err, product) {
		if (err) {
			res.write(err)
			res.sendStatus(500)
		}

		res.sendStatus(200);
	})
})