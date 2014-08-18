/**
 *  Data/database.js
 *  
 *  projectRepository for project
 * 
 * 
 */
(function (database) {
    
    /*----------------------  Mysql ----------------------------*/
    var mysql = require("mysql");
    var theDb = null;
    //database.con = mysql.createConnection({
    //    host     : 'localhost',
    //    user     : 'root',
    //    password : '',
    //    database: 'test'
    //});
    
    /*----------------------  Ms sqlserver ----------------------------*/
   /* var msnodesql = require('msnodesql');
    var connectionString = "Driver={SQL Server Native Client 11.0};Server=HASIBULWAHAB-PC;Database=dbCustomer;Uid=sa;Pwd=123;";
     msnodesql.query(connectionString, "select * from student", function (err, result) {
        res.send(result);
    
    });*/

    database.getDb = function (next) { 
        if (!theDb) {
            //connect to the database
            //--------------
            var con = mysql.createConnection({
                host     : 'localhost',
                user     : 'root',
                password : '',
                database: 'timesheetdb'
            });
            
            ////con.connect(function(err, db) {
            ////    if (err) {
            ////        next(err, null);
            ////    } else {
            ////        theDb = {
            ////            db: db
            ////        };
            ////        next(null, theDb);
            ////    }
            ////});

            con.connect(function(err, cn) {
                if (err) {
                    next(err, null);
                } else {
                    theDb = {

                        cn: con
                    };
                    next(null, theDb);
                }
            });
            //--------------
        } else {            
            next(null, theDb);
        }        
    };

})(module.exports); 