var Item = require('./../../models/Item');
var Category = require('./../../models/Category');
var Modifier = require('./../../models/Modifier');

module.exports = function(router) {

	router.route('/api/items')
		.get(function(req, res) {
			Item.find().populate('categories').populate('modifiers').exec(function(err, items){
				if (err) res.send(err);
				//console.log(items);
				res.json(items);
			});
		});

	router.route('/api/categories')
		.get(function(req, res) {
			Category.find({}, function(err, categories){
				if (err) res.send(err);
				res.json(categories);
			});
		});

	router.route('/api/modifiers')
		.get(function(req, res) {
			//Modifier.find().populate('selects').exec(function(err, modifiers){
			Modifier.find().exec(function(err, modifiers){
				if (err) res.send(err);
				//console.log(modifiers);
				res.json(modifiers);
			});
		});

	router.route('/api/items/:item_id')
		.get(function(req, res) {
			Item.findById(req.params.item_id).populate('categories').populate('modifiers').exec(function(err, item){
				if (err) res.send(err);
				res.json(item);
			});
		});

};
