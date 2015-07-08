var Items = require('./models/items');
var Categories = require('./models/categories');

module.exports = function(){
	var items = [
	{
		"SKU": "TY01",
		"name": "Chicken Teriyaki",
		"description": "Grilled chicken with teriyaki sauce",
		"price": 7.49,
		"categories": [ "teriyaki", "deepFry" ],
		"modifiers": [ "Side", "ExMeat" ],
		"images": [ "chicken_teriyaki.png" ],
		"meats": [ "chicken" ],
		"side": [ "rice", "salad" ],
		"abbr": "CH T"
	},
	{
		"SKU": "TY02",
		"name": "Spicy Chicken Teriyaki",
		"description": "Grilled chicken with teriyaki sauce",
		"price": 7.99,
		"categories": [ "teriyaki" ],
		"modifiers": [ "Side", "ExMeat" ],
		"images": [ "chicken_teriyaki.png" ],
		"meats": [ "chicken" ],
		"side": [ "rice", "salad" ],
		"abbr": "SP T"
	},
	{
		"SKU": "TY03",
		"name": "Chicken Breast Teriyaki",
		"description": "Grilled chicken with teriyaki sauce",
		"price": 8.49,
		"categories": [ "teriyaki" ],
		"modifiers": [ "Side", "ExMeat" ],
		"images": [ "chicken_teriyaki.png" ],
		"meats": [ "chicken" ],
		"side": [ "rice", "salad" ],
		"abbr": "BRST"
	},
	{
		"SKU": "TY04",
		"name": "Beef Teriyaki",
		"description": "Grilled chicken with teriyaki sauces.",
		"price": 8.49,
		"categories": [ "teriyaki" ],
		"modifiers": [ "Side", "ExMeat" ],
		"images": [ "chicken_teriyaki.png" ],
		"meats": [ "chicken" ],
		"side": [ "rice", "salad" ],
		"abbr": "BF T"
	},
	{
		"SKU": "TY05",
		"name": "Pork Teriyaki",
		"description": "Grilled chicken with teriyaki sauces.",
		"price": 8.49,
		"categories": [ "teriyaki" ],
		"modifiers": [ "Side", "ExMeat" ],
		"images": [ "chicken_teriyaki.png" ],
		"meats": [ "chicken" ],
		"side": [ "rice", "salad" ],
		"abbr": "PK T"
	},
	{
		"SKU": "TY06",
		"name": "Salmon Teriyaki",
		"description": "Grilled chicken with teriyaki sauces.",
		"price": 8.49,
		"categories": [ "teriyaki", "deepFry" ],
		"modifiers": [ "Side", "ExMeat" ],
		"images": [ "chicken_teriyaki.png" ],
		"meats": [ "chicken" ],
		"side": [ "rice", "salad" ],
		"abbr": "Salmon"
	}
	];

	Items.remove({}, function(err){
		for (var i=0; i<items.length; i++){
			Items.create(items[i], function(err, item){
				if (err) console.log(err);
				else console.log(item.name);
			});
		}
	});

	var categories = [
	{
		_id: "teriyaki",
		name: "Teriyaki",
		description: "All dishes come with rice and salad.",
		image: "chicken_teriyaki.png"
	},
	{
		_id: "deepFry",
		name: "Deep Fry",
		description: "All dishes come with rice and salad.",
		image: "chicken_teriyaki.png"
	},
	{
		_id: "stirFry",
		name: "Stir Fry",
		description: "All dishes come with rice.",
		image: "chicken_teriyaki.png"
	},
	{
		_id: "side",
		name: "Side",
		description: "All dishes come with rice.",
		image: "chicken_teriyaki.png"
	}
	];

	Categories.remove({}, function(err){
		if (err) console.log(err);
		for (var i=0; i<categories.length; i++){
			Categories.create(categories[i], function(err, category){
				if (err) console.log(err);
				else console.log(category._id + ": " + category.name);
			});
		}
	});

};

