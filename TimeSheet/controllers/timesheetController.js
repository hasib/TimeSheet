/**
 *  Controller/timesheetController.js
 *  
 *  Action for project
 * 
 * 
 */
(function (timesheetController) {
    
    var data = require("../data")
    
    var auth = require("../auth");
    var model = { Title: "Welcome to Demo Erp-", data: null, Message: "", Login: false, User: null };
    
    timesheetController.init = function (app) {
        //-------------------------------   home  --------------------------------------//
        app.get("/TimeSheet", auth.ensureAuthenticated, function (req, res) {
            model.Title = "Welcome to Aprosoft Demo ERP";
            
            data.getEmployees(function (err, results) {
                model.User = req.user;
                model.data = results;
                res.render("Timesheet/index", model);
            });
            
            
        });
        
        //-------------------------------   home  --------------------------------------//
        app.get("/TimeSheet/:projectId", auth.ensureAuthenticated, function (req, res) {
            model.Title = "Welcome to Aprosoft Demo ERP";
            var projectId = req.params.projectId;
            
            model.User = req.user;
            
            res.render("Timesheet/index", model);
        });

    }
    
       
    
})(module.exports);