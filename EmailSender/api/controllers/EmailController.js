/**
 * EmailController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

let nodemailer = require("nodemailer");
let cron = require("node-cron");
let smtpTransport = require("nodemailer-smtp-transport");

module.exports = {
  //send email
  sendEmail: async (req, res) => {
    let from = req.body.from;
    let to = req.body.to;

    let transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      secureConnection: false,
      port: 587,
      auth: {
        user: "testingout1979@outlook.com",
        pass: "testout@132",
      },
    });

    //schedule for 10AM
    cron.schedule("* * * * * *", async () => {
      let subject = "Please log in into the system";

      await Email.create({
        from: from,
        to: to,
        subject: subject,
      });

      transporter.sendMail(
        {
          from: from,
          to: to,
          subject: subject,
        },
        (err, info) => {
          if (err) console.log("ERROR=>", err);
          else console.log("INFO=>", info);
        }
      );

      return res.send("Email sent for log in ");
    });

    //schedule for 7PM
    cron.schedule("0 19 * * *", async () => {
      let subject = "Please log out from the system";

      await Email.create({
        from: from,
        to: to,
        subject: subject,
      });

      transporter.sendMail(
        {
          from: from,
          to: to,
          subject: subject,
        },
        (err, info) => {
          if (err) console.log("ERROR=>", err);
          else console.log("INFO=>", info);
        }
      );

      return res.send("Email sent for log out ");
    });
  },

  //list of sent emails with details
  listAll: async (req, res) => {
    //id = req.params.id;
    let emaildetails = await Email.find();
    res.send(emaildetails);
  },
};
