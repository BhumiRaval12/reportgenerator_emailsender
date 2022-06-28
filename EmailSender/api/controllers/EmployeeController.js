/**
 * EmployeeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const fs = require("fs");
const Json2csvParser = require("json2csv").Parser;
const moment = require("moment");

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
        return res.status(201).json({
          data: existsUser,
          status: "failed",
          message: "Already exists",
        });
      }
      const EmployeeData = await Employee.create(data).fetch();
      return res.status(201).json({
        status: "success",
        data: EmployeeData,
        message: "Successfully created..",
      });
    } catch (e) {
      console.log("Unable to create");
      return res.send({
        status: "failed",
        message: "Unable to create",
      });
    }
  },
  CreateReportforEmployee: async (req, res) => {
    try {
      id = req.query.id;
      const Employeedetails = await Employee.findOne({
        where: id,
      });

      console.log(Employeedetails);

      const findData = await Email.find({
        where: {
          id: id,
        },
      });

      let start_date, end_date;

      //sort by date range
      if (req.param("startDate") && req.param("endDate")) {
        start_date = moment(req.param("startDate"), "YYYY/MM/DD")
          .startOf("day")
          .valueOf();
        end_date = moment(req.param("endDate"), "YYYY/MM/DD")
          .endOf("day")
          .valueOf();
        findData.where = {
          ...findData.where,
          createdAt: { ">": start_date, "<": end_date },
        };
        console.log("date", start_date);
        console.log("date", end_date);
      }

      let query = await sails.sendNativeQuery(
        `SELECT * FROM email where createdAt between ${start_date} and ${end_date} and id=${id}`
      );

      const jsonData = JSON.parse(JSON.stringify(query));

      const fields1 = ["id", "from", "to", "createdAt", "updatedAt"];
      const newLine = "\r\n";
      const fields2 = ["id", "EmployeeDetails"];

      let empStr = `
 email: ${Employeedetails.email},
 fname: ${Employeedetails.fname},
 lname: ${Employeedetails.lname},
 designation: ${Employeedetails.designation},`;

      let emparr = [{ id: Employeedetails.id, EmployeeDetails: empStr }];

      const json2csvParser = new Json2csvParser({
        fields: fields2,
      });
      console.log(jsonData.rows);

      const csv = json2csvParser.parse(emparr) + newLine;

      fs.writeFile("Email-Details.csv", csv, function (error) {
        if (error) throw error;

        console.log("Write to Email-Details.csv successfully!");
      });

      const json2csvParsertwo = new Json2csvParser({
        fields: fields1,
      });
      const csv1 = json2csvParsertwo.parse(jsonData.rows);

      fields = csv1 + newLine;

      const final = fs.appendFile("Email-Details.csv", fields, function (err) {
        if (err) throw err;
        console.log("file saved");
      });
      console.log(final);

      res.attachment("Email-Details.csv").send(final);
    } catch (error) {
      return res.status(500).json({
        status: 500,
        data: "",
        error: "Unknown error",
      });
    }
  },

  CreateReportforMultipleEmployee: async (req, res) => {
    try {
      const Employeedetails = await Employee.find();
      console.log(Employeedetails);

      const findData = await Email.find();

      let start_date, end_date;

      //sort by date range
      if (req.param("startDate") && req.param("endDate")) {
        start_date = moment(req.param("startDate"), "YYYY/MM/DD")
          .startOf("day")
          .valueOf();
        end_date = moment(req.param("endDate"), "YYYY/MM/DD")
          .endOf("day")
          .valueOf();
        findData.where = {
          ...findData.where,
          createdAt: { ">": start_date, "<": end_date },
        };
        console.log("date", start_date);
        console.log("date", end_date);
      }

      let query = await sails.sendNativeQuery(
        `SELECT * FROM email where createdAt between ${start_date} and ${end_date}  `
      );

      const jsonData = JSON.parse(JSON.stringify(query));
      const json2csvParser = new Json2csvParser({ header: true });
      const csv = json2csvParser.parse(jsonData);
      fs.writeFile("Email-Details.csv", csv, function (error) {
        if (error) throw error;
        console.log("Write to Email-Details.csv successfully!");
      });

      const resData = jsonData.rows;
      console.log(resData);
      return res.send({
        data: { Employeedetails, resData },
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        data: "",
        error: "Unknown error",
      });
    }
  },
};
