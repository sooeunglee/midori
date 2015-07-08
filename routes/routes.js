var Items = require('./models/items');
var Categories = require('./models/categories');
var multer  = require('multer');
var fs = require('fs');
var async = require('async');


module.exports = function(app, passport) {

    /*Configure the multer.*/
    var done=false;
    app.use(multer({ dest: './public/images',
        rename: function (fieldname, filename) {
            return filename+Date.now();
        },
        onFileUploadStart: function (file) {
            console.log(file.originalname + ' is starting ...')
        },
        onFileUploadComplete: function (file) {
            console.log(file.fieldname + ' uploaded to  ' + file.path)
            done=true;
        }
    }));

    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    app.get('/menu', function(req, res){
        Items.find({}, function(err, items){
            if (err) res.send(err);
            res.render('menuList', { items: items });
        });
    });

    app.get('/menu/:id', function(req, res){
        async.parallel([
            function(callback){
                Categories.find({}, function(err, categories){
                    if (err) callback(err);
                    callback(null, categories);
                });
            },
            function(callback){
                Items.findById(req.params.id, function(err, item) {
                    if (err) callback(err);
                    callback(null, item);
                });
            }
        ],
        function(err, results){
            res.render('menuItem', {item: results[1], categories: results[0]});
        });
        /*
        Items.findById(req.params.id, function(err, item) {
            if (err) res.send(err);
            Categories.find({}, function(err, categories){
                if (err) res.send(err);
                res.render('menuItem', {item: item, categories: categories});
            });
        });
*/
    });

    app.get('/upload', function(req, res) {
        fs.readdir('public/images', function(err, files){
            console.log(files);
            res.render('upload.ejs', {images: files}); 
        });
    });

    app.post('/api/photo',function(req,res){
        if(done==true){
            console.log(req.files);
            //res.end("File uploaded.");
            res.redirect('/upload');
        }
    });



    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}