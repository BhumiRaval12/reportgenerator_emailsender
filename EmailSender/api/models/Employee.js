/**
 * Employee.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

//let nodemailer = require('nodemailer');

module.exports = {
  attributes: {
    email: {
      type: "string",
      unique: true,
      required: true,
    },
    fname: {
      type: "string",
      allowNull: false,
    },
    lname: {
      type: "string",
      allowNull: false,
    },
    designation: {
      type: "string",
      allowNull: false,
    },
  },
};
