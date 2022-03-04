const { faker } = require('@faker-js/faker');
const boom = require("@hapi/boom");

const { models }= require('./../libs/sequelize');

class OrdersService {
    
    constructor(){}

    async create(body){
        const newOrder = await models.Order.create(body);
        return newOrder;
    }

    async addItem(data) {
      const newItem = await models.OrderProduct.create(data);
      return newItem;
    }

    async find() {
        const orders = await models.Order.findAll();
        return orders;
      }

      async findOne(id) {
        const order = await models.Order.findByPk(id, {
          include: [
            {
              association: 'customer',
              include: ["user"]
            },
            'items'
          ]
        });
        if (!order) {
          throw boom.notFound('order not found');
        }
        return order;
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

module.exports = OrdersService;