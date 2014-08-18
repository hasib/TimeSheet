/**
 *  Data/repository/projectRepository.js
 *  
 *  projectRepository for project
 * 
 * 
 */
(function (projectRepository) {
    
    var database = require("../database");
    var tableName = "project";
    //------------------------------   get All project  -------------------------------------------------//
    projectRepository.getAll = function (next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err, null);
            } else {
                 

                db.cn.query('SELECT * FROM '+tableName+' order by Id desc', function (err, results) {
                    if (err) {
                        next(err, null);
                    } else {
                        next(null, results);
                    }
                });
                 
            }
        });
    };
    
    //------------------------------   get   project  -------------------------------------------------//
    projectRepository.getProject = function (projectId, next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err, null);
            } else {
                
                
                db.cn.query("SELECT * FROM "+tableName+" where Id =" + projectId, function (err, results) {
                    if (err) {
                        next(err, null);
                    } else {
                        next(null, results);
                    }
                });
                 
            }
        });
    };
    //------------------------------   Add  -------------------------------------------------//
    projectRepository.add = function (data, next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err, null);
            } else {
                
                
                db.cn.query("INSERT INTO " + tableName + " set ? ", data, function (err, results) {
                    if (err) {
                        next(err, null);
                    } else {
                        next(null, results);
                    }
                });
                 
            }
        });
    };

    //------------------------------   Edit  -------------------------------------------------//
    projectRepository.edit = function (data, next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err, null);
            } else {
                
                
                db.cn.query("Update " + tableName + " set ? WHERE Id = ? ", [data, data.Id], function (err, results) {
                    if (err) {
                        next(err, null);
                    } else {
                        next(null, results);
                    }
                });
                 
            }
        });
    };
     
    //------------------------------   delete  -------------------------------------------------//
    projectRepository.delete = function (data, next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err, null);
            } else {
                
                
                db.cn.query("DELETE FROM "+tableName+"  WHERE Id = ? ", [data], function (err, results) {
                    if (err) {
                        next(err, null);
                    } else {
                        next(null, results);
                    }
                });
                 
            }
        });
    };

})(module.exports)

