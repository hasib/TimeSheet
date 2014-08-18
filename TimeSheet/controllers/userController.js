/**
 *  Controller/userController.js
 *  
 *  Action for user
 * 
 * 
 */
(function (userController) {
    
    var data= require("../data/repository/userRepository")
    var controllerName = "user";
    var auth = require("../auth");
    var model = { Title: "Welcome to Demo Erp-", data: null, Message: "", Login: true };
 
    userController.init = function (app) {
        var InitModel = function () {
            model.User = global.user;
        }
        //-------------------------------    Get All--------------------------------------//
        app.get("/User", auth.ensureAuthenticated, function (req, res) {
            InitModel();
            model.Title = "Welcome to Aprosoft Demo ERP";             
            data.getAll(function (err, results) {
                model.data = results;
                res.render("User/index", model);
            });
            
            
        });
        
        //-------------------------------   Add New Get --------------------------------------//
        app.get("/User/Create", auth.ensureAuthenticated, function (req, res) {
            InitModel();
            //var customerId = req.params.customerId;
            model.Title = "Register";
            model.Message = "Register-> Your application description page. Use this area to provide additional information.";
            
            var newUser = {
               UserName:"",
               Password: "",
              FirstName: "",
              MiddleName: "",
              LastName: "",
              EmployeeId: "",
              ContactNo: "",
              UserStatus: "",
              RoleId: ""
            };
            model.data = newUser;
            res.render("User/create", model);
        });
        

        //-------------------------------   Add new Post --------------------------------------//
        app.post("/User/Create", auth.ensureAuthenticated, function (req, res) {
            
            //var categoryName = req.params.categoryName;
            InitModel();
            var newUser = {
                            UserName: req.body.UserName,
                            Password: req.body.Password,
                            FirstName: req.body.FirstName,
                            MiddleName: req.body.MiddleName,
                            LastName: req.body.LastName,
                            EmployeeId: req.body.EmployeeId,
                            ContactNo: req.body.ContactNo,
                            UserStatus: req.body.UserStatus,
                            RoleId: req.body.RoleId
                
            };
            data.add(newUser, function (err) {
                if (err) {
                    // Handle Error
                    console.log(err);
                    //req.flash("NewCustomer", err);
                    res.redirect("/User");
                } else {
                    //res.redirect("/notes/" + categoryName);
                    res.redirect("/User");
                }
            });
        });
        //-------------------------------   edit new Get --------------------------------------//
        app.get("/User/Edit/:customerId", auth.ensureAuthenticated, function (req, res) {
            InitModel();
            //var customerId = req.params.customerId;
            model.Title = "Register";
            model.Message = "Register-> Your application description page. Use this area to provide additional information.";
            var customerId = req.params.customerId;
            
            data.getUser(customerId, function (err, customer) {
                if (err) {
                    //res.send(400, err);
                } else {
                     console.log(customer);
                    model.Title = customer[0].name + " Welcome to Aprosoft Demo ERP";
                    model.data = customer[0];
                    res.render("User/Edit", model);
                }
            });
            
        });
        //-------------------------------   Edit Post --------------------------------------//
        app.post("/User/Edit", auth.ensureAuthenticated, function (req, res) {
            
            //var categoryName = req.params.categoryName;
            InitModel();
            var newUser = {
                Id: req.body.Id,
                UserName: req.body.UserName,
                Password: req.body.Password,
                FirstName: req.body.FirstName,
                MiddleName: req.body.MiddleName,
                LastName: req.body.LastName,
                EmployeeId: req.body.EmployeeId,
                ContactNo: req.body.ContactNo,
                UserStatus: req.body.UserStatus,
                RoleId: req.body.RoleId
            };
            data.edit(newUser, function (err) {
                if (err) {
                    // Handle Error
                    console.log(err);
                    //req.flash("NewCustomer", err);
                    res.redirect("/User");
                } else {
                    //res.redirect("/notes/" + categoryName);
                    res.redirect("/User");
                }
            });
        }); 
        //-------------------------------   details --------------------------------------//
        app.get("/User/Details/:userId", auth.ensureAuthenticated, function (req, res) {
            InitModel();
            var userId = req.params.userId;
            
            data.getUser(userId, function (err, customer) {
                if (err) {
                    //res.send(400, err);
                } else {
                    //res.set("Content-Type", "application/json");
                    //res.send(notes.notes);
                    console.log(customer);
                    model.Title = customer[0].name+ " Welcome to Aprosoft Demo ERP";
                    model.data = customer[0];
                    res.render("User/details", model);
                }
            });
        });
        
        //-------------------------------   delete --------------------------------------//
        app.get("/User/delete/:customerId", auth.ensureAuthenticated, function (req, res) {
            InitModel();
            var customerId = req.params.customerId;
            
            data.getUser(customerId, function (err, customer) {
                if (err) {
                    //res.send(400, err);
                } else {
                    //res.set("Content-Type", "application/json");
                    //res.send(notes.notes);
                    console.log(customer);
                    model.Title = customer[0].name + " Welcome to Aprosoft Demo ERP";
                    model.data = customer[0];
                    res.render("User/delete", model);
                }
            });
        
        });
       
        //-------------------------------   delete --------------------------------------//
        app.get("/User/deleteConfirm/:customerId", auth.ensureAuthenticated,function (req, res) {
            InitModel();
            var customerId = req.params.customerId;
            
            data.delete(customerId, function (err, customer) {
                if (err) {
                    //res.send(400, err);
                } else {
                    //res.set("Content-Type", "application/json");
                    //res.send(notes.notes);
                    //console.log(customer);
                    // model.Title = customer[0].name + " Welcome to Aprosoft Demo ERP";
                    //model.data = customer[0];
                    //res.render("User/delate", model);
                    res.redirect("/User");
                }
            });
        
        });
        
        
 

    }
    
       
    
})(module.exports);