var Staffs = require('./../models/staffs');

module.exports = function(router) {
	
	router.route('/staffs')

		.post(function(req, res) {
			
			var staffs = new Staffs();
			//var order = (typeof req.body === 'object')? req.body : JSON.parse(req.body);
			var staff = req.body;
			staffs.name 	= staff.name;
			staffs.email 	= staff.email;
			staffs.passcode = staff.passcode;

			staffs.save(function(err, staff) {
				if (err)
					res.send(err);
				res.json({ id: staff._id });
			});
		})

		.get(function(req, res) {
			Staffs.find({}, function(err, staffs) {
				if (err)
					res.send(err);
				res.json(staffs);
			});
		});

	router.route('/staffs/passcode')

		.put(function(req, res) {
			var passcode = req.body.passcode;
			//console.log(req.body);
			Staffs.findOne({passcode: passcode}, function(err, staff) {
				if (err) res.send(err);
				//console.log(staff);
				if (staff) res.json(staff);
				else res.send(404);
			});
		});

	router.route('/staffs/:id')

		.get(function(req, res) {
			//console.log(req.params.id);
			Staffs.findById(req.params.id, function(err, staff) {
				if (err)
					res.send(err);
				res.json(staff);
			});
		});
		
	router.route('/staffs/:id/clocks')

		.put(function(req, res) {
			Staffs.findById(req.params.id, function(err, staff) {
				if (err)
					res.send(err);
				var clock = {};
				clock.type = req.body.type;
				clock.date = new Date().toISOString();
				//console.log(clock);
				staff.clocks.push(clock);
				staff.save(function(err){
					if (err) res.send(err);
					res.json(staff);
				});
			});
		});
		
};
