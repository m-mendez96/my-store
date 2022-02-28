const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_tABLE = 'users';

const UserSchema = { 
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    email: {
        allowNull: false,
        unique : true,
        type: DataTypes.STRING
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
    }   
}

class User extends Model {
    static associate(){
        // associate
    }

    static config(sequelize){
        return {
            sequelize,
            tableName: USER_tABLE,
            modelName: 'User',
            timestamps: false
        }
    }
}

module.exports = { USER_tABLE, UserSchema, User }