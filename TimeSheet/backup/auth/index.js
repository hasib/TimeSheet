// auth/index.js
(function (auth) {

    var data = require("../data/repository/userRepository")
  var hasher = require("./hasher");

  var passport = require("passport");

  var localStrategy = require("passport-local").Strategy;


  function userVerify(username, password, next) {
    data.getUserByName(username, function (err, user) {
      if (!err && user) {
        var testHash = hasher.computeHash(password, user.Salt);
        if (testHash === user.PasswordHash) {
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
    } else {
      res.redirect("/login");
    }
  };

  auth.ensureApiAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) { 
      next();
    } else {
      res.send(401, "Not authorized");
    }
  };

  auth.init = function (app) {

    // setup passport authentication
    passport.use(new localStrategy(userVerify));
    passport.serializeUser(function (user, next) {
        console.log("user: "+ user, user.UserName)
      next(null, user.username);
        });

    passport.deserializeUser(function (key, next) {
      data.getUserByName(key, function (err, user) {
            if (err || !user) {
              next(null, false, { message: "Could not find user" });
            } else {
              next(null, user);
            }
                });
        });

    app.use(passport.initialize());
    app.use(passport.session());
    
    app.get("/Account/login", function (req, res) {
      res.render("login", { title: "Login to The Board" });
    });

        app.post("/Account/login", function (req, res, next) {
           
      var authFunction = passport.authenticate("local", function (err, user, info) {
        if (err) {
          next(err);
                } else {
                    var user1 = {
                        name: user.Name,
                        email: user.Email,
                        username: user.UserName,
                        passwordHash: user.PasswordHash,
                        salt: user.Salt
                    };
                    

                  req.logIn(user1, function (err) {
                        if (err) {
                          next(err);
                        } else {
                          res.redirect("/");
                        }                 
                    });
                   // res.redirect("/");
                }
      });
      authFunction(req, res, next);
    });

    app.get("/register", function (req, res) {
      res.render("register", { title: "Register for The Board", message: req.flash("registrationError") });
    });

    app.post("/register", function (req, res) {

      var salt = hasher.createSalt();

      var user = {
        Name: req.body.name,
        Email: req.body.email,
        UserName: req.body.username,
        PasswordHash: hasher.computeHash(req.body.password, salt),
        Salt: salt 
      };

      data.add(user, function (err) {
        if (err) {
          req.flash("registrationError", "Could not save user to database.");
          res.redirect("/register");
        } else {
          res.redirect("/login");
        }
      });
    });

  };

})(module.exports);