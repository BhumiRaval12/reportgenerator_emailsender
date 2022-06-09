/**
 * EmailController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  // list of sent emails with details
  listAll: async (req, res) => {
    let emaildetails = await Email.find();
    console.log(emaildetails);
    res.send(emaildetails);
  },
};
