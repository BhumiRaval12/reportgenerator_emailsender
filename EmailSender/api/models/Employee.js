/** 
 * Employee.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
let Validator = require("validatorjs");

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
  validateEmployee: function (data) {
    let result = {};
    let rules = {
      email: "required|email",
      fname: "required|string|min:2",
      lname: "required|string|min:2",
      designation: "required|string",
    };
    let validation = new Validator(data, rules);
    if (validation.passes()) {
      result["hasError"] = false;
    }
    if (validation.fails()) {
      result["hasError"] = true;
      result["errors"] = validation.errors.all();
     
    }
    return result;
  },
};
