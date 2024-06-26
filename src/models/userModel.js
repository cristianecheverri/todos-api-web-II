const { DataTypes } = require('sequelize');
const sequelize = require('../../db/sequelize');

const User = sequelize.define(
    'users',
    {
        // Model attributes are defined here
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

// User.sync({ alter: true })
module.exports = User;