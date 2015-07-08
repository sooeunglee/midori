var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Clocks = new Schema({
	date: { type: Date, default: Date.now },
	type: String //* "IN" or "OUT"
});

var Staffs  = new Schema({
	name: String,
	email: String,
	passcode: String,
	clocks: [Clocks]
});

module.exports = mongoose.model('staffs', Staffs);
