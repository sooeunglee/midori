var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema  = new Schema({
	_id: Number,
	name: String,
	abbr: String,
	price: Number,
	image: String,
	categories: [ {type: Number, ref: 'Category' } ],
	modifiers: [ {type: Number, ref: 'Modifier' } ]
});

module.exports = mongoose.model('Item', ItemSchema);
