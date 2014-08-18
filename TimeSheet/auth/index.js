(function (auth) {
    
    //var data = require("../data");
    var data = require("../data/repository/userRepository")
    //var model = { errormsg: null };
    
    var passport = require("passport");
    var localStrategy = require("passport-local").Strategy;
    
    function userVerify(username, password, next) {
        data.getUserByName(username, function (err, user) {
            if (!err && user) {
                if (user.Password == password) {
                    next(null, user);
                    return;
                }
            }
            next(null, false, { message: "Invalid Credentials." });
        });
    }
    
    
    auth.ensureAuthenticated = function (req, res, next) {
        if (req.isAuthenticated()) {
            next();
        }
        else {
            res.redirect("/Account/login");
        }
    };
    

    auth.init = function (app) {
        
        //setup passport authentication
        passport.use(new localStrategy(userVerify));
        passport.serializeUser(function (user, next) {             
            next(null, user.UserName);            
        });

        passport.deserializeUser(function (key, next) {
            data.getUserByName(key, function (err, user) {
                if (err) {
                    //next(null, false, { message: "Failed to retrive user"} )
                    next(null, false, { message: "Could not find user." })
                }
                else {
                    next(null, user);   //Successfully retrive user from database.
                }
            });
        })
        app.use(passport.initialize());
        app.use(passport.session());

        app.get("/Account/login", function (req, res) {
            //res.render("login", { title: "Login to TimeSheet", message: req.flash("loginError") });
            console.log(  req.flash("loginError"));
            res.render("Account/Login", { Title: "Login to TimeSheet", Message: req.flash("loginError")  });            
        });

        app.post("/Account/login", function (req, res, next) {
            
         global.user
            var authFunction = passport.authenticate("local", function (err, user, info) {                
                if (err) {                    
                    next(err);
                } 
                else {
                    req.logIn(user, function (err) {
                        if (err) {                            
                            //next(err);                            
                            res.redirect("/Account/login");
                        } 
                        else {
                            //res.redirect("/");
                            global.user = user;
                            res.redirect("/Dashboard");                            
                        }
                    });
                }
            });
            authFunction(req, res, next);
        });
                
    };

})(module.exports);