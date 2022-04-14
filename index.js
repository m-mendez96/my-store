const express = require("express");
const cors = require("cors");
const routerApi = require("./routes")
const { checkApiKey } = require('./middlewares/auth.handler');
const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = 3000;

app.use(express.json());

//const whitelist = ["http://localhost:8080", "https://myapp.co", "http://localhost:3000"];
//const options = {
//  origin: (origin, callback) => {
//    if (whitelist.includes(origin)) {
//      callback(null, true);
//    } else {
//      callback(new Error('no permitido'));
//    }
//  }
//}
//app.use(cors(options));

require('./utils/auth');

app.get("/", checkApiKey, (req, res)=> {
    res.send("Server Express");
});

routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, ()=>{
    console.log("Port = " + port);
});
