/**
 * EmployeeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

let Validator = require("validatorjs");

module.exports = {
  CreateEmployee: async (req, res) => {
    let { email, fname, lname } = req.body;

    let validator = new Validator(
      {
        email: email,
        fname: fname,
        lname: lname,
      },
      {
        email: "required|email",
        fname: "required|min:2",
        lname: "required|min:2",
      }
    );

    async function passes() {
      // Validation passed
      const employee = await Employee.find({
        email: email,
      }).limit(1);
      if (employee.length >= 1) {
        res.send({
          status: "failed",
          message: "Already exists",
        });
      }
      try {
        await Employee.create({
          email: email,
          fname: fname,
          lname: lname,
        }).fetch();
        const existsUser = await Employee.findOne({
          email: email,
        });
        res.status(201).send({
          status: "success",
          message: "Successfully created......",
        });
      } catch (e) {
        console.log(e);
        res.send({
          status: "failed",
          message: "Unable to create",
        });
      }
    }

    function fails() {
      let errors = validator.errors.all();
      let message = "";
      for (const error in errors) {
        message += errors[error];
      }
      console.log(message);
      res.send({
        status: "invalid data",
        message: message,
      });
    }

    validator.checkAsync(passes, fails);
  },
};
