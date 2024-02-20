require("dotenv").config();
//const { Sequelize } = require("sequelize");
const UserModel = require("./models/UserModel");
//const OtroModel = require("./models/OtroModel");


const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/???`, {
  logging: console.log('Connected to DB...'),   
  native: false, 
});
// Definición de modelos
// UserModel(sequelize);
// OtroModel(sequelize);
// relaciones
//const { User, Otro } = sequelize.models;

// Aca vendrían las relaciones

/*
module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
*/


