module.exports = {
  friendlyName: "Email sender",

  description: "Sends an email",

  inputs: {
    subject: {
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
      description: "Mail could not be sent due to some errors.",
    },
  },

  fn: async function (inputs, exits) {
    const nodemailer = require("nodemailer");

    var smtpTransport = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: "bhumiraval875@gmail.com",
        pass: "hvkqfjkwcdxidjsc",
      },
    });

    var mailOptions = {
      to: "bhumiraval456@gmail.com",
      from: "bhumiraval875@gmail.com",
      subject: inputs.subject,
    };

    await smtpTransport.sendMail(mailOptions, async (err) => {
      if (err) {
        console.log(`hii error from mailSender : ${err}`);
        sails.log.info("error---->", { err });
        return exits.mailError(err);
      }
      console.log("hii solved");

      await Email.create(mailOptions);

      console.log("hii email sent for db");
      return exits.success(true);
    });
  },
};
