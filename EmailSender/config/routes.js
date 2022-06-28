/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  "POST /CreateEmployee": "EmployeeController.CreateEmployee",
  "POST /listAll": "EmailController.listAll",
  "GET /EmployeeReport": "EmployeeController.CreateReportforEmployee",
  //"GET /Exportfile": "EmployeeController.Downloadcsv",
  "GET /MultipleEmployeeReport": "EmployeeController.CreateReportforMultipleEmployee",
  "GET /testcsv": "EmployeeController.testcsv",
};

