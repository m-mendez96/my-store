const express = require("express");

const UsersService = require("./../services/users");

const router = express.Router();
const service = new UsersService();

router.get("/", async (req, res)=>{
    const { limit, offset } = req.query;
    const users = await service.find();
    res.json(users)
});

module.exports = router 