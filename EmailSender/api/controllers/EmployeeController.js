/**
 * EmployeeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  CreateEmployee: async (req, res) => {
    let data = _.pick(req.body, ["email", "fname", "lname", "designation"]);

    try {
      let validatedData = await Employee.validateEmployee(data);
      if (validatedData["hasError"]) {
        return res.status(ResponseCodes.BAD_REQUEST).json({
          status: ResponseCodes.BAD_REQUEST,
          data: "",
          error: validatedData["errors"],
        });
      }

      const existsUser = await Employee.findOne({
        email: data.email,
      });

      if (existsUser) {
        return res.send({
          status: "failed",
          message: "Already exists",
        });
      } else {
        await Employee.create(data);
        res.status(201).send({
          status: "success",
          message: "Successfully created......",
        });
      }
    } catch (e) {
      console.log("Unable to create");
      return res.send({
        status: "failed",
        message: "Unable to create",
      });
    }
  },
};
