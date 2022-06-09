module.exports = {
  friendlyName: "Email sender",

  description: "Sends an email",

  inputs: {},

  exits: {
    success: {
      outputFriendlyName: "Mail is sent",
      outputDescription: "Mail has been sent successfully.",
    },

    mailError: {
      description:
        "Mail could not be sent due to some errors.",
    },
  },

  fn: async function (inputs, exits) {
    const nodemailer = require("nodemailer");

    var smtpTransport = nodemailer.createTransport({
      host: "smtp.outlook.com",
      port: 587,
      auth: {
        user: "testingout1979@outlook.com",
        pass: "testout@132",
      },
    });

    var mailOptions = {
      to: "bhumiraval875@gmail.com",
      from: "testingout1979@outlook.com",
      subject: "hello this is me",
    };

    await smtpTransport.sendMail(mailOptions, (err) => {
      if (err) {
        console.log(`hii error from mailSender : ${err}`);
        sails.log.info("error---->", { err });
        return exits.mailError(err);
      }
      console.log("hii solved");

      return exits.success(true);
    });
  },
};
