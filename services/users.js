const { faker } = require('@faker-js/faker');
const boom = require("@hapi/boom");

const getConnection = require('../libs/postgres');

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

    async create(body){
        const newUser = {
            id: faker.datatype.uuid(),
            name: faker.name.firstName(),
            email: faker.internet.email()
        }
        this.users.push(newUser);
        return newUser;
    }

    async find() {
        const client = await getConnection();
        const rta = await client.query('SELECT * FROM tasks');
        return rta.rows;
    }

    async findOne(id){
        const user = this.users.find(item => item.id == id);
        if (!user){
            throw boom.notFound("user not found");
        }
        return user;
    }

    async update(id, changes){
        const index = this.users.findIndex(item => item.id === id);
        if (index === -1) {
            throw boom.notFound("user not found");
        }
        const user = this.users[index];
        this.users[index] = {
          ...user,
          ...changes
        };
        return this.users[index];
      }

    async delete(id){
        const index = this.users.findIndex(item => item.id === id);
        if (index === -1){
            throw boom.notFound("user not found");
        }
        this.users.splice(index, 1);
        return { id };
    }

}

module.exports = UsersSerivce