
angular.module('midori.services', ["ngCookies"])

.factory('Items', ['$http', '$filter', 'Menu', '$q', function($http, $filter, Menu, $q) {
	//var apiUrl = 'https://arcane-taiga-5677.herokuapp.com/api/items';
	//var apiUrl = 'http://localhost:8081/api/items';
	var apiUrl = '/api/items';
	var config = { headers: {'Content-Type': 'application/x-www-form-urlencoded'} };
	return {
		loadAllMenu: function(){
			if (Menu.items.length > 0) return Menu;
			var deferred = $q.defer();
			var arr = [];
			arr.push($http.get('/api/items'));
			arr.push($http.get('/api/categories'));
			arr.push($http.get('/api/modifiers'));
			$q.all(arr)
				.then(
				function(results){
					deferred.resolve(results);
				},
				function(error){
					deferred.reject(errors);
				},
				function(updates){
					deferred.update(updates);
				});
				return deferred.promise.then(function(data){
					Menu.items = data[0].data;
					Menu.categories = data[1].data;
					Menu.modifiers = data[2].data;
					console.log(Menu);
					return Menu;
				});
		},
		getAll: function() {
			return $http.get('/api/items');
		},
		get: function(id) {
			return $http.get('/api/items/'+id);
		},
		getCategories: function(){
			return $http.get('/api/categories');
		},
		getModifiers: function(){
			return $http.get('/api/modifiers');
		},
		create: function(formData) {
			var data = "data=" + JSON.stringify(formData);
			return $http.post(apiUrl, data, config);
		},
		update: function(formData, id) {
			var data = "data=" + JSON.stringify(formData);
			return $http.put(apiUrl+"/"+id, data, config);
		},
		delete: function(id) {
			return $http.delete(apiUrl+"/"+id, config);
		}
	}
}])

.factory('Orders', ['$http', function($http) {
	//var apiUrl = 'https://arcane-taiga-5677.herokuapp.com/api/items';
	var apiUrl = '/api/orders';
	var config = { headers: {'Content-Type': 'application/x-www-form-urlencoded'} };
	return {
		get: function(id) {
			return $http.get(apiUrl+"/"+id);
		},
		create: function(order){
			return $http.post(apiUrl, order);
		}
	}
}])

.value('Menu', {
	items: [],
	categories: [],
	modifiers: []
})

.value('Types', {
	dining: [
		{
			name: "Togo",
			icon: "fa fa-suitcase"
		},
		{
			name: "Here",
			icon: "fa fa-cutlery"
		}
	],
	order: [
		{
			name: "Walk-in",
			icon: "fa fa-user"
		},
		{
			name: "Online",
			icon: "fa fa-globe"
		},
		{
			name: "Phone",
			icon: "fa fa-phone"
		}
	]
})

.factory('Cart', ['Menu', '$cookies', 'Types', function(Menu, $cookies, Types){
	var cart, itemId;
	var taxRate = 9.5;
	var diningTypes = [ "Togo", "Here" ];
	var orderTypes = [ "Walk-in", "Online", "Phone" ];
	initCart();

	function initCart(){
		cart = {
			items: [],
			total: 0,
			subtotal: 0,
			tax: 0,
			diningType: Types.dining[0].name,
			orderType: Types.order[1].name,
			pickupTime: "ASAP",
			userId: "",
			userName: ""
		};
		itemId = 0;
	}

	function reCalculate(){
		var subtotal = 0;
		for (var i=0; i<cart.items.length; i++){
			subtotal += (cart.items[i].qty * cart.items[i].basePrice);
		}
		cart.subtotal = Number(subtotal.toFixed(2));
		var tax = subtotal * taxRate / 100;
		cart.tax = Number(tax.toFixed(2));
		var total = subtotal + tax;
		cart.total = Number(total.toFixed(2));
	}

	function reCalculateItem(item){
		var total = 0;
		for (var i=0; i<item.modifiers.length; i++){
			var modifier = item.modifiers[i];
			if (modifier.type == 'A') {
				total += modifier.selects[modifier.selected].price;
			}
			else {
				var selects = modifier.selects;
				for (var j=0; j<selects.length; j++){
					if (selects[j].qty > 0) {
						total += (selects[j].qty * selects[j].price);
					}
				}
			}
		}
		total += item.basePrice;
		return total;
	}

	function storeCookie(){
		//$cookies.putObject('cart', JSON.stringify(cart));
		$cookies.putObject('cart', cart);
	}
	function getCookie(){
		return $cookies.getObject('cart');
		//return $cookies.getObject('cart');
	}

	return {
		createItem: function(item){
			var obj = {};
			obj._id = itemId++;
			obj.name = item.name;
			obj.abbr = item.abbr;
			obj.image = item.image;
			obj.qty = 1;
			obj.price = item.price;
			obj.basePrice = item.price;
			obj.modifiers = item.modifiers;
			cart.items.push(obj);
			reCalculate();
			return cart.items.length-1;
		},
		getCart: function(){
			return cart;
		},
		getItem: function(id){
			if (typeof cart.items[id] === "undefined") return false;
			else return cart.items[id];
		},
		setItemModifiers: function(modifiers, id){
			cart.items[id].modifiers = modifiers;
			return this.computeItemPrice(id);
		},
		removeAll: function(){
			initCart();
			//storeCookie();
		},
		computeItemPrice: function(id){
			return cart.items[id].price = reCalculateItem(cart.items[id]);
		}
	}
}])
;

/*
.factory('Cart', ['$cookieStore', function($cookieStore){
	//$cookieStore.put('cart', JSON.stringify({}));
	var cart;
	var cartItem;

	function storeCart(){
		$cookieStore.put('cart', JSON.stringify(cart));
	}

	function createItem(){
		var obj = new Object({
			id: item._id,
			name: item.name,
			abbr: item.abbr,
			qty: item.qty,
			price: item.price,
			totalPrice: (item.price * item.qty),
			options: []
		});
		return obj;
	}

	function createOption(){
		var obj = new Object({

		});
		return obj;
	}

	function checkSameItem(item, items){
		for (var i=0; i<items.length; i++){
			if (item._id === items[i].id && !items[i].optons) return i;
		}
		return -1;
	}
	return {
		getCart: function(){
			var cart = $cookieStore.get('cart');
			return (cart) ? JSON.parse($cookieStore.get('cart')) : {};
		},
		putCart: function(cart){
			$cookieStore.put('cart', JSON.stringify(cart));
		},
		plusOne: function(index){
			var cart = this.getCart();
			cart.items[index].qty++;
			this.putCart(cart);
		},
		setItem: function(item, qty){
			var cart = this.getCart();
			if (!cart.items) cart.items = [];
			var sameItemIndex = checkSameItem(item, cart.items);
			if (sameItemIndex >= 0) {
				this.plusOne(sameItemIndex);
				this.setSelectedItem(sameItemIndex);
				return sameItemIndex;
			}
			else {
				var cartItem = {};
				cartItem.id = item._id;
				cartItem.name = item.name;
				cartItem.abbr = item.abbr;
				cartItem.qty = qty;
				cartItem.price = item.price;
	            cart.items.push(cartItem);
			    this.putCart(cart);
			    this.setSelectedItem(cart.items.length-1);
			    return (cart.items.length-1);
			}
		},
		setSelectedItem: function(index){
			var cart = this.getCart();
			for (var i=0; i<cart.items.length; i++){
				delete cart.items[i].selected;
			}
			cart.items[index].selected = true;
			this.putCart(cart);
		},
		getSelectedItemIndex: function(){
			var cart = this.getCart();
			for (var i=0; i<cart.items.length; i++){
				if (cart.items[i].selected == true) return i;
			}
			return -1;
		},
		setOptions: function(theOption){
			var cart = this.getCart();
			var index = this.getSelectedItemIndex();
			if (index >= 0) {
				var option = {};
				option.name = theOption.name;
				option.abbr = theOption.abbr;
				option.price = theOption.price;
				if (!cart.items[index].options) cart.items[index].options = [];
				cart.items[index].options.push(option);
				this.putCart(cart);
				console.log(cart.items[index]);
			}
			else console.log("Selected Item not found when option inserted.");
		},
		getTotal: function(){
			var items = this.getCart().items;
			var total = { subtotal: 0, tax: 0, total: 0};
			if (items) {
				for (var i=0; i<items.length; i++){
					total.subtotal += (items[i].qty * items[i].price);
				}
				total.tax = total.subtotal * 0.095;
				total.total = total.subtotal + total.tax;
			}
			return total;
		},
		removeItem: function(index){
			var cart = this.getCart();
			cart.items.splice(index, 1);
			this.putCart(cart);
			return cart;
		},
		qtyUpdate: function(index, qty){
			var cart = this.getCart();
			cart.items[index].qty = qty;
			this.putCart(cart);
			return cart;
		},
		removeCart: function(){
			var cart = {};
			this.putCart(cart);
		},
		setOption: function(){

		},
		newItem: function(item, qty){
			cartItem = {};
			cartItem.id = item._id;
			cartItem.name = item.name;
			cartItem.abbr = item.abbr;
			cartItem.qty = qty;
			cartItem.price = item.price;
		},
		getItem: function(){
			return cartItem;
		}
	}
}])

.factory('StripePayment', ['$http', function($http) {
	var apiUrl = 'http://localhost:8081/api/';
	return {
		charge: function(stripeToken, amount) {
			return $http({
			    method: 'POST',
			    url: apiUrl + "stripe",
			    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			    transformRequest: function(obj) {
			        var str = [];
			        for(var p in obj)
			        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
			        return str.join("&");
			    },
			    data: {stripeToken: stripeToken, amount: amount}
			})
			.success(function(user){
				//console.log(user);
			})
			.error(function(err){
				//console.log(err);
			});
		}
	}
}])
;

*/




