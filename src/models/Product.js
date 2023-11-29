const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Product = sequelize.define('product', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descriptiom: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
});

module.exports = Product;