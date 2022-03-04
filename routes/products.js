const express = require("express");
const { required, valid } = require("joi");

const ProductsService = require("./../services/products");
const validatorHandler = require("./../middlewares/validator.handler");
const { creareProductSchema, updateProductSchema, getProductSchema} = require("./../schemas/products");

const router = express.Router();
const service = new ProductsService();

router.get("/", async (req, res)=>{
    const products = await service.find();
    res.json(products)
});

router.get("/:id",
  validatorHandler(getProductSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch(error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(creareProductSchema, 'body'),
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
  validatorHandler(getProductSchema, "params"),
  validatorHandler(updateProductSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const rta =  await service.delete(id);
    res.json(rta);
});

module.exports = router