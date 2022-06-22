/**
 * EmployeeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const fs = require("fs");
const Json2csvParser = require("json2csv").Parser;
const moment = require("moment");
const CsvParser = require("json2csv").Parser;

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
    id = req.query.id;
    const Employeedetails = await Employee.find({
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
      `SELECT * FROM email where createdAt between ${start_date} and ${end_date} and id=${id}  `
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
      data: [resData, Employeedetails],
    });
  },
  Downloadcsv: async (req, res) => {
    Email.find().then((objs) => {
      let EDetails = [];
      objs.forEach((obj) => {
        const { id, from, to, subject, createdAt, updatedAt } = obj;
        EDetails.push({ id, from, to, subject, createdAt, updatedAt });
      });
      const csvFields = [
        "id",
        "from",
        "to",
        "subject",
        "createdAt",
        "updatedAt",
      ];
      const csvParser = new CsvParser({ csvFields });
      const csvData = csvParser.parse(EDetails);
      res.setHeader("Content-Type", "text/csv");
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=Email-Details.csv"
      );
      // res.status(200).send(csvData);
      // res.Download(csvData);
      res.status(200).end(csvData);
    });
  },
  CreateReportforMultipleEmployee: async (req, res) => {
    // id = req.query.id;
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
      data: [resData, Employeedetails],
    });
  },
};
