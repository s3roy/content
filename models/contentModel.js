import { DataTypes } from 'sequelize';
import sequelize from '../utils/database.js';

const Content = sequelize.define('Content', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    streamerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    contentUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    reason: {
        type: DataTypes.TEXT,  // Updated to TEXT
        allowNull: true,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default Content;
