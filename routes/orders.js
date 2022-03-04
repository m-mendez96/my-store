const express = require("express");
const { required, valid } = require("joi");

const OrdersService = require("./../services/orders");
const validatorHandler = require("./../middlewares/validator.handler");
const { creareOrderSchema, updateOrderSchema, getOrderSchema, addItemSchema} = require("./../schemas/orders");

const router = express.Router();
const service = new OrdersService();

router.get("/", async (req, res)=>{
    const orders = await service.find();
    res.json(orders)
});

router.get("/:id",
  validatorHandler(getOrderSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await service.findOne(id);
      res.json(order);
    } catch(error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(creareOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      res.status(201).json(await service.create(body));
    } catch (error) {
      next(error);
    }
  }
);

router.patch("/:id", 
  validatorHandler(getOrderSchema, "params"),
  validatorHandler(updateOrderSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const order = await service.update(id, body);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const rta =  await service.delete(id);
    res.json(rta);
});

router.post('/add-item',
  validatorHandler(addItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      res.status(201).json(await service.addItem(body));
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router