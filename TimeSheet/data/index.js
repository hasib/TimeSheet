/**
 *  Data/repository/projectRepository.js
 *  
 *  projectRepository for project
 * 
 * 
 */
(function (data) {
    
    var database = require("./database");
    // get All customer 
    data.getEmployees = function (next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err, null);
            } else {
                 

                db.cn.query('SELECT * FROM customer', function (err, results) {
                    if (err) {
                        next(err, null);
                    } else {
                        next(null, results);
                    }
                });
                 
            }
        });
    };
    
    // get a customer 
    data.getCustomer = function (customerId,next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err, null);
            } else {
                
                
                db.cn.query('SELECT * FROM customer where id ='+ customerId, function (err, results) {
                    if (err) {
                        next(err, null);
                    } else {
                        next(null, results);
                    }
                });
                 
            }
        });
    };
    // add a customer 
    data.createCustomer = function (data, next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err, null);
            } else {
                
                
                db.cn.query("INSERT INTO customer set ? ", data, function (err, results) {
                    if (err) {
                        next(err, null);
                    } else {
                        next(null, results);
                    }
                });
                 
            }
        });
    };

    // edit a customer 
    data.editCustomer = function (data, next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err, null);
            } else {
                
                
                db.cn.query("Update customer set ? WHERE id = ? ", [data,data.id], function (err, results) {
                    if (err) {
                        next(err, null);
                    } else {
                        next(null, results);
                    }
                });
                 
            }
        });
    };

    
    // delete a customer 
    data.deleteCustomer = function (data, next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err, null);
            } else {
                
                
                db.cn.query("DELETE FROM customer  WHERE id = ? ", [data], function (err, results) {
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

