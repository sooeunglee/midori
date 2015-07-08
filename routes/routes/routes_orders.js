var Order = require('./../../models/Order');

module.exports = function(router) {

	router.route('/api/orders')

		.post(function(req, res) {

			var order = new Order();
			order.setOrder(req.body);
			order.save(function(err, order) {
				if (err)
					res.send(err);
				res.send(order._id);
			});

		})

		.get(function(req, res) {
			Orders.find({}, function(err, orders) {
				if (err)
					res.send(err);
				res.json(orders);
			});
		})

	router.route('/api/orders/:id')

		.get(function(req, res) {
			Order.findById(req.params.id, function(err, order) {
				if (err)
					res.send(err);
				res.json(order);
			});
		})


};
