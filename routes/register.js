var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log("render: register page++++");
    res.render('register', { title: 'Express' });
});

module.exports = router;
