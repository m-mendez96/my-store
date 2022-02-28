const { faker } = require('@faker-js/faker');
const boom = require("@hapi/boom");

const { models } = require('../libs/sequelize');

class UsersSerivce {
    
    constructor(){
        this.users = [];
        this.generate();
    }

    generate(){
        const limit = 4; 
        const users = [];
        for (let index = 0; index < limit; index++){
            users.push({
                id: faker.datatype.uuid(),
                name: faker.name.firstName(),
                email: faker.internet.email()
            });
        }
        this.users = users;
        return this.users;
    }

    async create(data){
        //const unique = await models.User.findOne({email: data["email"]});
        //if (unique != null)
        //    throw boom.badRequest("user email exits");
        const newUser = await models.User.create(data);
        return newUser;
    }

    async find() {
        const rta = await models.User.findAll();
        return rta;
    }

    async findOne(id){
        const user = await models.User.findByPk(id);
        if (!user){
            throw boom.notFound("user not found");
        }
        return user;
    }

    async update(id, changes){
        const user = await this.findOne(id);
        const rta = await user.update(changes);
        return rta;
      }

    async delete(id){
        const user = await this.findOne(id);
        await user.destroy();
        return { id };
    }

}

module.exports = UsersSerivce