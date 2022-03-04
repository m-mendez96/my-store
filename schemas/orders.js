const Joi = require("joi");

const id = Joi.number().integer();
const customerId = Joi.number().integer();

const creareOrderSchema = Joi.object({
    customerId: customerId.required(),
});

const updateOrderSchema = Joi.object({
    customerId: customerId
});

const getOrderSchema = Joi.object({
    id: id.required(),
});

module.exports = { creareOrderSchema, updateOrderSchema, getOrderSchema}