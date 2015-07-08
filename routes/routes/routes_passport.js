module.exports = function(router, passport) {

    // process the login form
    /*
    router.post('/login',
        passport.authenticate('local-login'), 
        function(req, res) {
            return res.json(req.user);
        });
    */
    router.post('/login', function(req, res, next) {
        passport.authenticate('local-login', function(err, user, info) { 
            if (err) { return next(err); }
            if (!user) { 
                return res.send(401, info); 
                //return res.json(info); 
            }
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                return res.json(user);
            });
        })(req, res, next);
    });
    
    // process the signup form
    router.post('/signup', function(req, res, next) {
        passport.authenticate('local-signup', function(err, user, info) { 
            if (err) { return next(err); }
            if (!user) { 
                return res.json(info); 
            }
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                return res.json(user);
            });
        })(req, res, next);
    });

    // LOGOUT 
    router.get('/logout', function(req, res) {
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
