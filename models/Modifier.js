var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ModifierItemSchema = new Schema({
	name: String,
	abbr: String,
	price: Number,
	is_selected: Boolean
});

var ModifierSchema  = new Schema({
	_id: Number,
	name: String,
	type: String,
	selects: [ ModifierItemSchema ],
	selected: Number
});

module.exports = mongoose.model('Modifier', ModifierSchema);
