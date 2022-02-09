const Sequelize = require("sequelize");

const sequelize = new Sequelize("webcourse_crud", "web_crud", "Root@456", {
     dialect: "mysql",
     host: "localhost",
     port: "3306",
});



module.exports = sequelize;