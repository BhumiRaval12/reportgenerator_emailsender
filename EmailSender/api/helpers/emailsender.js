module.exports = {
  friendlyName: "Mail sender",

  description:
    "Sends an email using the credentials specified in the .env file",

  inputs: {
    mailTo: {
      friendlyName: "Email address of recipient",
      description: "The email address of recipient to send the email to.",
      type: "string",
    },
    mailSubject: {
      friendlyName: "Email Subject",
      description: "The subject of the email.",
      type: "string",
    },
  },

  exits: {
    success: {
      outputFriendlyName: "Mail is sent",
      outputDescription: "Mail has been sent successfully.",
    },

    mailError: {
      description:
        "Mail could not be sent due to some errors. Please check the logs for more details.",
    },
  },

  fn: async function (inputs, exits) {
    // Initializing nodemailer
    const nodemailer = require("nodemailer");

    var smtpTransport = nodemailer.createTransport({
      host: "smtp.outlook.com",
      port: 587,
      auth: {
        user: "testingout1979@outlook.com",
        pass: "testout@132",
      },
    });

    // Setting up mail options for sending mail.
    var mailOptions = {
      to: "bhumiraval875@gmail.com",
      from: "testingout1979@outlook.com",
      subject: "hello thi is me",
    };

    // Sends email asynchronously and capturing the response
    await smtpTransport.sendMail(mailOptions, (err) => {
      // Handle the error if any and return the mailError exit route
      if (err) {
        console.log(`hii error from mailSender : ${err}`);
        sails.log.info("error---->", { err });
        return exits.mailError(err);
      }
      console.log("hii solved");
      // Mail has been sent successfully.
      return exits.success(true);
    });
  },
};
