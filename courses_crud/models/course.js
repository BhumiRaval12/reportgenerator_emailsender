const Sequelize = require('sequelize');
const sequelize = require("../config/db_connection");



const Courses = sequelize.define("courses", {
     id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
     },
     Course_name: {
          type: Sequelize.STRING,
          allowNull: false,
     },
     Course_Duration: {
          type: Sequelize.INTEGER,
          allowNull: false,
     },
     Course_Fees: {
          type: Sequelize.INTEGER,
          allowNull: false,
     }

});

module.exports = Courses;