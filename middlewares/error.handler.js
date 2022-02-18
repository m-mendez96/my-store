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

function boomErrorHandler(error, rerq, resm, next){
    console.log("boomErrorHandler");
    if (error.isBoom){
        const { output } = error;
        res.status(output.statusCode).json(output.payload);
    }  
    next(error);
 }

 module.exports = { logErrors, errorHandler, boomErrorHandler }