/**
 *  Data/repository/userRepository.js
 *  
 *  userRepository for user
 * 
 * 
 */
(function (userRepository) {
    
    var database = require("../database");
    var tableName = "User";
    //------------------------------   get All User  -------------------------------------------------
    userRepository.getAll = function (next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err, null);
            } else {
                
                
                db.cn.query('SELECT * FROM ' + tableName, function (err, results) {
                    if (err) {
                        next(err, null);
                    } else {
                        next(null, results);
                    }
                });
                 
            }
        });
    };
    
    //------------------------------   get All User  -------------------------------------------------//
    userRepository.getUser = function (userId, next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err, null);
            } else {
                
                
                db.cn.query("SELECT * FROM " + tableName + " where id =" + userId, function (err, results) {
                    if (err) {
                        next(err, null);
                    } else {
                        next(null, results);
                    }
                });
                 
            }
        });
    };
    
    //------------------------------   get User By Name  -------------------------------------------------//
    userRepository.getUserByName = function (userName, next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err, null);
            } else {
                //db.cn.query("SELECT * FROM " + tableName + " where UserName ='" + userName + "'", function (err, results) {
                db.cn.query("SELECT  u.UserName, u.Password,FirstName,MiddleName,LastName,EmployeeId,ContactNo,r.Name AS 'RoleName' FROM `timesheetdb`.`user` AS u INNER JOIN `timesheetdb`.`role`  AS r  ON (u.`RoleId` = r.`Id`) where UserName ='" + userName + "'", function (err, results) {
                    if (err) {
                        next(err, null);
                    } else {
                        next(null, results[0]);
                    }
                });
                 
            }
        });
    };
    
    
    //------------------------------   Add Name  -------------------------------------------------//
    userRepository.add = function (data, next) {
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
    
    //------------------------------   Edit Name  -------------------------------------------------//
    userRepository.edit = function (data, next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err, null);
            } else {                
                console.log("Update " + tableName + " set ? WHERE id = ? ", data.Id);
                db.cn.query("Update " + tableName + " set ? WHERE id = ? ", [data, data.Id], function (err, results) {
                    if (err) {
                        next(err, null);
                    } else {
                        next(null, results);
                    }
                });
                 
            }
        });
    };
    
    
    //------------------------------   Delete Name  -------------------------------------------------//
    userRepository.delete = function (data, next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err, null);
            } else {
                db.cn.query("DELETE FROM " + tableName + "  WHERE id = ? ", [data], function (err, results) {
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

