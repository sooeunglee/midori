var items = [
    {
        _id: 1,
        name: "Chicken Gyoza Eggroll",
        abbr: "CH+GZ+E",
        image: "ChickenGyozaEggroll.png",
        price: 9.49,
        modifiers: [ 0, 1 ],
        categories: [ 0 ]
    },
    {
        _id: 2,
        name: "Spicy Gyoza Eggroll",
        abbr: "SP+GZ+E",
        price: 9.49,
        modifiers: [ 0, 1 ],
        categories: [ 0 ]
    },
    {
        _id: 3,
        name: "General Chicken Gyoza",
        abbr: "Gen+GZ",
        price: 9.49,
        modifiers: [ 0, 1 ],
        categories: [ 0 ]
    },
    {
        _id: 4,
        name: "Crispy Gyoza",
        abbr: "Crsp GZ",
        price: 9.49,
        modifiers: [ 0, 1 ],
        categories: [ 0 ]
    },
    {
        _id: 11,
        name: "Chicken Teriyaki",
        abbr: "CH T",
        price: 7.49,
        modifiers: [ 0, 1 ],
        categories: [ 1 ]
    },
    {
        _id: 12,
        name: "Spicy Chicken Teriyaki",
        abbr: "SP T",
        price: 7.99,
        modifiers: [ 0, 1 ],
        categories: [ 1 ]
    },
    {
        _id: 13,
        name: "Chicken Breast Teriyaki",
        abbr: "BRST",
        price: 8.49,
        modifiers: [ 0, 1 ],
        categories: [ 1 ]
    },
    {
        _id: 14,
        name: "Beef Teriyaki",
        abbr: "BF T",
        price: 8.49,
        modifiers: [ 0, 1 ],
        categories: [ 1 ]
    },
    {
        _id: 15,
        name: "Pork Teriyaki",
        abbr: "Pork T",
        price: 8.49,
        modifiers: [ 0, 1 ],
        categories: [ 1 ]
    },
    {
        _id: 16,
        name: "Salmon Teriyaki",
        abbr: "Salmon",
        price: 10.49,
        modifiers: [ 0, 1 ],
        categories: [ 1 ]
    },
    {
        _id: 21,
        name: "Chicken Katsu",
        abbr: "Katsu",
        price: 8.99,
        image: "Katsu.jpg",
        modifiers: [ 0, 2 ],
        categories: [ 2 ]
    },
    {
        _id: 22,
        name: "Crispy Chicken",
        abbr: "Crispy",
        price: 8.99,
        modifiers: [ 0, 2 ],
        categories: [ 2 ]
    },
    {
        _id: 23,
        name: "Gyoza Plate",
        abbr: "Gyoza PL",
        price: 8.99,
        modifiers: [ 0, 2 ],
        categories: [ 2 ]
    }
];

var categories = [
    {
        _id: 0,
        name: "Today's Special",
        image: "ChickenGyozaEggroll.png"
    },
    {
        _id: 1,
        name: "Teriyaki",
        image: "ChickenGyoza.jpg"
    },
    {
        _id: 2,
        name: "Battered",
        image: "Katsu.jpg"
    }
];

var modifiers = [
    {
        _id: 0,
        name: "Rice Option",
        type: "A",
        selects: [
            {
                name: "White Rice",
                abbr: "White",
                price: 0.00,
                is_selected: true
            },
            {
                name: "Brown Rice",
                abbr: "Brown",
                price: 0.50
            },
            {
                name: "Fried Rice",
                abbr: "Fried",
                price: 2.00
            },
            {
                name: "No Rice",
                abbr: "No Rice",
                price: 0.00
            }
        ],
        selected: 0
    },
    {
        _id: 1,
        name: "Add-on",
        type: "B",
        selects: [
            {
                name: "Salad",
                abbr: "Salad",
                price: 0.50,
                qty: 0
            },
            {
                name: "4Gyoza",
                abbr: "4Gyoza",
                price: 2.00,
                qty: 0
            },
            {
                name: "1Eggroll",
                abbr: "1Eggroll",
                price: 2.00,
                qty: 0
            }
        ],
        selected: []
    },
    {
        _id: 2,
        name: "Add-on Type B",
        type: "B",
        selects: [
            {
                name: "Extra Chicken",
                abbr: "Ex CH",
                price: 3.50,
                qty: 0
            },
            {
                name: "Extra Spicy Chicken",
                abbr: "Ex SPCH",
                price: 3.50,
                qty: 0
            },
            {
                name: "Extra Chicken Breast",
                abbr: "Ex BRST",
                price: 3.50,
                qty: 0
            },
            {
                name: "Extra Beef",
                abbr: "Ex BF",
                price: 3.50,
                qty: 0
            },
            {
                name: "Extra Pork",
                abbr: "Ex PK",
                price: 3.50,
                qty: 0
            },
            {
                name: "Extra Shrimp",
                abbr: "Ex Shrimp",
                price: 3.50,
                qty: 0
            },
            {
                _id: "EXTF",
                name: "Extra Tofu",
                abbr: "Ex Tofu",
                price: 2.00,
                qty: 0
            },
            {
                name: "Extra Veggies",
                abbr: "Ex Veg",
                price: 2.00,
                qty: 0
            },
            {
                name: "Extra Mushroom",
                abbr: "Ex Veg",
                price: 2.00,
                qty: 0
            },
            {
                name: "Extra Broccoli",
                abbr: "Ex Veg",
                price: 2.00,
                qty: 0
            },
            {
                name: "Extra Yakisoba Noodle",
                abbr: "Ex Noodle",
                price: 2.00,
                qty: 0
            }
        ],
        selected: []
    }
];

db.items.remove({});
db.items.insert(items);
db.categories.remove({});
db.categories.insert(categories);
db.modifiers.remove({});
db.modifiers.insert(modifiers);
