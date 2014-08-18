/**
 *  Controller/Api/userController.js
 *  
 *  Action for user
 * 
 * 
 */

(function (projectController) {
    
    var data = require("../../data/repository/projectRepository");
    //var auth = require(".../auth");
    //-------------------------------   init--------------------------------------//
    projectController.init = function (app) {
        
        app.get("/api/projects/", 
      //auth.ensureApiAuthenticated,
      function (req, res) {
            
            var categoryName = req.params.categoryName;
            
            data.getAll(function (err, results) {
                
                if (err) {
                    res.send(400, err);
                } else {
                    res.set("Content-Type", "application/json");
                    res.send(results);
                }
            });
        });
        //-------------------------------    projects /2--------------------------------------//
        app.get("/api/projects/:id",
      //auth.ensureApiAuthenticated,
      function (req, res) {
            
            var categoryName = req.params.id;
            data.getProject(categoryName, function (err, results) {
                
                if (err) {
                    res.send(400, err);
                } else {
                    res.set("Content-Type", "application/json");
                    res.send(results);
                }
            });
        });
        //-------------------------------    projects /2--------------------------------------//
        app.post("/api/projects/",
      //auth.ensureApiAuthenticated,
      function (req, res) {
            
            // var categoryName = req.params.categoryName;
            
            var projectToInsert = {
                Id: 0,
                Name: req.body.Name,
                StartDate: req.body.StartDate,
                EndDate: req.body.EndDate,
                Note: req.body.Note,
                ReportingFreqId: req.body.ReportingFreqId
            };
            
            data.add(projectToInsert, function (err, results) {
                if (err) {
                    res.send(400, "Failed to add project to data store");
                } else {
                    res.set("Content-Type", "application/json");
                    projectToInsert.Id = results.insertId;
                    res.send(201, projectToInsert);
                }
            });

        });
        //-------------------------------    projects /2--------------------------------------//
        app.post("/api/projects/:projectid",
      //auth.ensureApiAuthenticated,
      function (req, res) {
            
            // var categoryName = req.params.categoryName;
            
            var projectToInsert = {
                Id: req.body.Id,
                Name: req.body.Name,
                StartDate: req.body.StartDate,
                EndDate: req.body.EndDate,
                Note: req.body.Note,
                ReportingFreqId: req.body.ReportingFreqId
            };
            
            data.edit(projectToInsert, function (err, results) {
                if (err) {
                    res.send(400, "Failed to update  project to data store");
                } else {
                    res.set("Content-Type", "application/json");
                    res.send(201, results);
                }
            });

        });

        //-------------------------------    projects /2--------------------------------------//
        app.delete("/api/projects/:projectid",
      //auth.ensureApiAuthenticated,
      function (req, res) {
            
             var projectid = req.params.projectid;
            
            var projectToInsert = {
                Id: req.body.Id,
                Name: req.body.Name,
                StartDate: req.body.StartDate,
                EndDate: req.body.EndDate,
                Note: req.body.Note,
                ReportingFreqId: req.body.ReportingFreqId
            };
            
            data.delete(projectid, function (err, results) {
                if (err) {
                    res.send(400, "Failed to delete  project to data store");
                } else {
                    res.set("Content-Type", "application/json");
                    res.send(201, results);
                }
            });

        });
    };

})(module.exports);