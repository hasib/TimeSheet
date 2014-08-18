/**
 *  Controller/index.js
 *  
 *  init all controller
 * 
 * 
 */
(function (controllers) {
    
    /***************** controllers ********************* */
    var homeController = require("./homeController");
    var userController = require("./userController");
    var projectController = require("./projectController");
    var timesheetController = require("./timesheetController");

    /***************** Api contr9ollers ********************* */ 
    var projectApiController = require("./api/projectController");
 
    /***************** Init ********************* */
    controllers.init = function (app) {
        //------------------------- init general controller -----------------------------
        homeController.init(app);
        userController.init(app);
        projectController.init(app);
        timesheetController.init(app);
        //------------------------- init api controller -----------------------------
        projectApiController.init(app);
    };
})(module.exports);