/**
 *  homeController.js
 *  
 *  Action for genral perpose
 * 
 * 
 */
(function (homeController) {
    // database access
    var data= require("../data")
    // auth access
    var auth = require("../auth");
    
    // common model/object pass to view
    // Title: user for page titel 
    // data: its hold data objects like array
    // Message: any message to show in client side 
    // user: login user
   var model = { Title: "Welcome to Demo Erp-", data: null, Message: "",Login: false,User: global.user};
     
    homeController.init = function (app) {
        var InitModel = function () {
            model.User = global.user;
        }
        //-------------------------------------------- Home ---------------------------------------------------------------------//
        app.get("/", function (req, res) {

            model.Title = "Welcome to Aprosoft Demo ERP";
            
            data.getEmployees(function (err, results) {
                model.data = results;            
                res.render("Home/index", model);
            });
        });
        
        //-------------------------------------------- /About ---------------------------------------------------------------------//
        app.get("/About", auth.ensureAuthenticated, function (req, res) {

            model.Title = "About - Welcome to Aprosoft Demo ERP";               
            model.Message = " hello" + req.user.PasswordHash;

            res.render("Home/About", model);
            console.log(req.url);
        });

        //-------------------------------------------- /About ---------------------------------------------------------------------//
        app.get("/Contact", function (req, res) {
              
            model.Title = "Contact - Welcome to Aprosoft Demo ERP";
            model.Message = " Your application description page. Use this area to provide additional information.";

            res.render("Home/Contact", model);
            console.log(req.url);
        });

        //-------------------------------------------- /Account/Logout ---------------------------------------------------------------------//
        app.get("/Account/Logout", auth.ensureAuthenticated,function (req, res) {
            req.logout();
            global.user = null;
            InitModel();
            res.redirect('/');
        });

        //-------------------------------------------- /Account/Register ---------------------------------------------------------------------//
        app.get("/Account/Register", function (req, res) {

            model.Title = "Register";
            model.Message = "Register-> Your application description page. Use this area to provide additional information.";
             
            res.render("Account/Register", model);
            console.log(req.url);
        });

        //-------------------------------------------- /Account/Manage ---------------------------------------------------------------------//
        app.get("/Account/Manage", auth.ensureAuthenticated, function (req, res) {
           
            model.Title = "Manage";
            model.Message = "Manage-> Your application description page. Use this area to provide additional information.";
            InitModel();
            res.render("Account/Manage", model);
            console.log(req.url);
        });
        

        //-------------------------------------------- /Dashboard ---------------------------------------------------------------------//
        app.get("/Dashboard", auth.ensureAuthenticated,function (req, res) {
            
            model.Title = "Register";            
            model.Message = "Register-> Your application description page. Use this area to provide additional information.";
           // model.User = req.user;
            InitModel();
            res.render("Home/Dashboard", model);
            console.log(req.url);
        });

    }
    
       
    
})(module.exports);