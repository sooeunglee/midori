var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CounterSchema = new Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
});
var Counter = mongoose.model('counter', CounterSchema);

var ModifierItemSchema = new Schema({
    _id: Number,
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

var ItemSchema = new Schema({
    _id: Number,
    name: String,
    abbr: String,
    price: Number,
    image: String,
    qty: Number,
    price: Number,
    basePrice: Number,
    modifiers: [ ModifierSchema ]
});

var OrderSchema  = new Schema({
	//userId: Schema.Types.ObjectId,
    userName: String,
	diningType: String,
    orderType: String,
	createdAt: Date,
	items: [ ItemSchema ],
    total: Number,
    subtotal: Number,
    tax: Number,
    number: Number
});

OrderSchema.pre('save', function(next) {
    var doc = this;
    Counter.findByIdAndUpdate({_id: 'order'}, {$inc: { seq: 1} }, function(error, counter)   {
        if(error)
            return next(error);
        doc.number = counter.seq;
        next();
    });
});


OrderSchema.methods.setOrder = function (order) {
    this.userName = order.userName;
    this.diningType = order.diningType;
    this.orderType = order.orderType;
    this.items = order.items;
    this.total = order.total;
    this.subtotal = order.subtotal;
    this.tax = order.tax;
	this.createdAt = new Date();
	return this;
};

module.exports = mongoose.model('Order', OrderSchema);
