module.exports = {
  friendlyName: "Mail sender",

  description:
    "Sends an email using the credentials specified in the .env file",

  inputs: {},

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
   
  },
};
