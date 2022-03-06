const { faker } = require('@faker-js/faker');
const boom = require("@hapi/boom");
const { query } = require('express');

const { models }= require('./../libs/sequelize');

class ProductsService {
    
    constructor(){
        this.products = [];
        this.generate();
    }

    generate(){
        const limit = 3; 
        const products = [];
        for (let index = 0; index < limit; index++){
            products.push({
                id: faker.datatype.uuid(),
                name: faker.commerce.productName(),
                price: parseInt(faker.commerce.price(), 10),
                image: faker.image.imageUrl(),
                isBlock: faker.datatype.boolean(),
            });
        }
        this.products = products;
        return this.products;
    }

    async create(body){
        const newProduct = await models.Product.create(body);
        return newProduct;
    }

    async find(query) {
        const options = {
          include: ['category'],
        }
        const { limit, offset } = query;
        
        if (limit && offset) {
          options.limit = limit;
          options.offset = offset;
        }

        const products = await models.Product.findAll(options);
        return products;
      }

      async findOne(id) {
        const product = await models.Product.findByPk(id, {
          include: ['category']
        });
        if (!product) {
          throw boom.notFound('product not found');
        }
        return product;
      }

      async update(id, changes) {
        const model = await this.findOne(id);
        const rta = await model.update(changes);
        return rta;
      }

      async delete(id) {
        const model = await this.findOne(id);
        await model.destroy();
        return { rta: true };
      }
}

module.exports = ProductsService