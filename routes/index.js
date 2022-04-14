const express = require("express");

const productsRouter = require("./products");
const usersRouter = require("./users");
const customersRouter = require("./customers");
const categoriesRouter = require("./categories");
const ordersRouter = require("./orders");
const authRouter = require("./auth");
const profileRouter = require("./profile");


function routerApi(app){
    const router = express.Router();
    app.use("/api/v1", router);

    router.use("/products", productsRouter);
    router.use("/users", usersRouter);
    router.use("/customers", customersRouter);
    router.use("/categories", categoriesRouter);
    router.use("/orders", ordersRouter);
    router.use("/auth", authRouter);
    router.use("/profile", profileRouter);
}

module.exports = routerApi