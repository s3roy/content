import { DataTypes } from 'sequelize';
import sequelize from '../utils/database.js';

const Config = sequelize.define('Config', {
    fetchApi: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default Config;
