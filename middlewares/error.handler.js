const res = require("express/lib/response");

 function logErrors (error, req, res, next){
    console.log("logErrors"); 
    console.log(error);
     next(error);
 }

 function errorHandler(error, rerq, resm, next){
    console.log("errorHandler");  
    res.status(500).json({
        message: error.message,
        stack: error.stack
     });
 }

 module.exports = { logErrors, errorHandler }