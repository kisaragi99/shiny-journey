import { Model, DataTypes } from 'sequelize';
import sequelize from './db.js';

class ShortenedUrl extends Model {}
ShortenedUrl.init({
    url: DataTypes.STRING(4000),
    shortenedUrl: DataTypes.STRING,
    dateCreated: DataTypes.DATE,
}, { sequelize, modelName: 'shortenedUrl' });

export default ShortenedUrl;
