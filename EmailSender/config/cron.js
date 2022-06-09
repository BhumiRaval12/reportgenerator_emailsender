module.exports.cron = {
  emailReminderforLogin: {
    schedule: "00 20 13 * * *",
    onTick: () => {
      sails.helpers.emailsender.with({ subject:"Please log in into the system" }).then((success, err) => {
        if (success) {
          console.log("Email sent log in!!!");
        }
        if (err) {
          sails.log.error("Error while sending reminder");
          console.log(err);
        }
      });
    },
  },
  emailReminderforLogout: {
    schedule: "00 56 12 * * *",
    onTick: () => {
      sails.helpers.emailsender.with({ subject:"Please log out from the system" }).then((success, err) => {
        if (success) {
          console.log("Email sent logout!!!");
        }
        if (err) {
          sails.log.error("Error while sending reminder");
          console.log(err);
        }
      });
    },
  },
};
