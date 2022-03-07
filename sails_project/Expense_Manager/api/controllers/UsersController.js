/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports = {
  createAccount: async (req, res) => {
    let {
      name,
      email,
      password
    } = req.body;
    const user = await Users.find({
      email: email
    }).limit(1);
    if (user.length >= 1) {
      res.send({
        status: 'failed',
        message: 'Email already exists'
      });

    } else {
      if (name && email && password) {
        const salt = await bcrypt.gensalt(10);
        const hashpassword = await bcrypt.hash(password, salt);

        try {
          await User.create({
            name: name,
            email: email,
            password: hashpassword,

          });
          //await doc.save();
          const saveduser = await User.findOne({
            email: email
          });

          //genearte jwt
          const token = jwt.sign({userid: saveduser.id},
            process.env.JWT_SECRET_KEY, { expiresIn: '1h'}
          );

          res
            .status(201)
            .send({
              status: 'success',
              message: 'Registration successfully..',
              token: token,
            });
        }catch(error){
             
        }
      } else {
        res.send({
          status: 'failed',
          message: 'password and confirm password are not match!..',
        });
      }

    }
  },



};
