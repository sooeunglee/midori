var express = require('express');
var router = express.Router();

router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	//res.header("Access-Control-Allow-Origin", "http://localhost");
	//res.header("Access-Control-Allow-Origin", "*");
	//res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	next(); // make sure we go to the next routes and don't stop here
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

require('./routes/routes_items')(router);
require('./routes/routes_orders')(router);


module.exports = router;
