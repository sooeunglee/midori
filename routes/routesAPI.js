module.exports = function(router, passport) {
	// middleware to use for all requests
	router.use(function(req, res, next) {
		// do logging
		console.log('Something is happening.');
		//res.header("Access-Control-Allow-Origin", "http://localhost");
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
		next(); // make sure we go to the next routes and don't stop here
	});

	// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
	router.get('/', function(req, res) {
		//res.json({ message: 'Welcome to our REST api!' });	
        res.render('index.ejs'); // load the index.ejs file
	});
	// more routes for our API will happen here
	//require('./routes/routes_menus')(router);
	require('./routes/routes_staffs')(router);
	require('./routes/routes_items')(router);
	require('./routes/routes_orders')(router);
	require('./routes/routes_passport')(router, passport);
};

