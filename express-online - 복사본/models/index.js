const path = require('path');
const Sequelize = require('sequelize');


const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname,'..','config','config.json'))[env];
const db = {};

const sequelize = new Sequelize(process.env.DATABASE, process.env.DB_USER,process.env.DB_PASSWORD,{
  host : process.env.DB_HOST,
  dialect : 'mysql',
  timezone : '+09:00'
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
