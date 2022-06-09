module.exports.cron = {
  emailReminderforLogin: {
    schedule: "00 59 11 * * *",
    onTick: () => {
      sails.helpers.emailsender().then((success, err) => {
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
    schedule: "00 58 11 * * *",
    onTick: () => {
      sails.helpers.emailsender().then((success, err) => {
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