import { DataTypes } from 'sequelize';
import sequelize from '../utils/database.js';

const Content = sequelize.define('Content', {
    streamerId: {
        type: DataTypes.STRING,
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
        type: DataTypes.STRING,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

export default Content;
