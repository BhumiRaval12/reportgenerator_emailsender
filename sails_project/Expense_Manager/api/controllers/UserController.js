/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports = {

  //For creating new account
  createAccount: async (req, res) => {
    let {
      name,
      email,
      password
    } = req.body;
    const user = await User.find({
      email: email
    }).limit(1);
    if (user.length >= 1) {
      res.send({
        status: 'failed',
        message: 'Already exists'
      });

    } else {
      if (name && email && password) {
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password, salt);
        console.log(hashpassword);
        try {
          await User.create({
            name: name,
            email: email,
            password: hashpassword
          }).fetch();
          const existsUser = await User.findOne({
            email: email
          });
          res.status(201).send({
            status: 'success',
            message: 'Registration successfully..',

          });

        } catch (e) {
          console.log(e);
          res.send({
            status: 'failed',
            message: 'Unable to Register',

          });

        }
      } else {
        res.send({
          status: 'failed',
          message: 'password and confirm password are not match!..',
        });
      }

    }
  },

  //For user login
  login: async (req, res) => {
    try {
      const {
        email,
        password
      } = req.body;
      if (email && password) {
        const user = await User.findOne({
          email: email
        });
        if (user !== null) {
          const ismatch = await bcrypt.compare(password, user.password);
          if (user.email === email && ismatch) {
            //genrate token
            const token = jwt.sign({
                userid: user._id
              },
              process.env.JWT_SECRET_KEY, {
                expiresIn: '5d'
              }
            );

            await User.update({}).set({
              isLogin: false
            });
            await User.update({
              email: email
            }).set({
              isLogin: true
            });
            req.app.locals.name = user.name;
            req.app.locals.email = user.email;
            req.app.locals.id = user.id;
            console.log(req.app.locals);
            res.send({
              status: 'success',
              message: 'Login Success',
              token: token,
              userDetails: user
            });

          } else {
            res.send({
              status: 'failed',
              message: 'Email or Password is not valid',
            });
          }
        } else {
          res.send({
            status: 'failed',
            message: 'You are not registerd user'
          });
        }
      } else {
        res.send({
          status: 'failed',
          message: 'All field are required..'
        });
      }
    } catch (error) {
      console.log(error);
      res.send({
        status: 'failed',
        message: 'Unable to login'
      });
    }
  },

  //For user logout
  logout: async (req, res) => {
    try {
      await User.update({
        id: req.params.id
      }).set({
        isLogin: false
      });
      res.send({
        message: 'Logout Success'
      });

    } catch (e) {
      console.log(e);
      res.send({
        status: 'failed',
        message: 'Unable to logout'
      });

    }
  },

  //To get all accounts
  Account: async (req, res) => {
    console.log(req.app.locals.id);
    const account = await Account.find({
      Members: req.app.locals.id
    });

    res.send({
      Accounts: account
    });
    sails.log(account);




  },

  //To add your new account
  addAccount: async (req, res) => {
    console.log(req.body);
    console.log(req.app.locals.id);
    const account = await Account.create({
      Accountname: req.body.Accountname,
      Members: req.app.locals.id,
      Users: req.app.locals.id

    });
    res.send({
      message: 'Account Added Successfully'
    });
  },

  //To edit your account name
  editAccountName: async (req, res) => {
    await Account.update({
      id: req.params.accountId,

    }).set({
      Accountname: req.body.Accountname
    });
    res.send({
      message: 'Account Name Updated succesfully..'
    });

  },

  //To Delete your account
  deleteAccountName: async (req, res) => {
    await Account.destroy({
      id: req.params.accountId,
    });
    res.send({
      message: 'Account deleted succesfully'
    });
  }




};
