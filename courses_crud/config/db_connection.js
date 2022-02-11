const Sequelize = require("sequelize");

const sequelize = new Sequelize("bhumir", "bhumir", "GFujeMX3GkN8QwEajXpKTPYUVZpCF7Ht", {
     dialect: "mysql",
     host: "15.206.7.200",
     port: "3310",
});



module.exports = sequelize;