/**
 * EmailController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
  // list of sent emails with details
  listAll: async (req, res) => {
    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit);
    const skip = (page - 1) * limit;

    const emaildetails = await Email.find({
      skip: skip,
      limit: limit,
    });
    console.log(emaildetails);
    res.send(emaildetails);
  },
};
