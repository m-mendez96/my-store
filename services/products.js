const { faker } = require('@faker-js/faker');

class ProductsService {
    
    constructor(){
        this.products = [];
        this.generate();
    }

    generate(){
        const limit = 100; 
        const products = [];
        for (let index = 0; index < limit; index++){
            products.push({
                id: faker.datatype.uuid(),
                name: faker.commerce.productName(),
                price: parseInt(faker.commerce.price(), 10),
                image: faker.image.imageUrl(),
            });
        }
        this.products = products;
        return this.products;
    }

    create(body){
        const newProduct = {
            id: faker.datatype.uuid(),
            name: faker.commerce.productName(),
            price: parseInt(faker.commerce.price(), 10),
            image: faker.image.imageUrl(),
        }
        this.products.push(newProduct);
        return newProduct;
    }

    find(){
        return this.products;
    }

    findOne(id){
        return this.products.find(item => item.id == id);
    }

    update(){

    }

    delete(){

    }
}

module.exports = ProductsService