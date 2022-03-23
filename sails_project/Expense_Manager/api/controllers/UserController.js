/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let Validator = require('validatorjs');


module.exports = {

  //For creating new account
  createAccount: async (req, res) => {
    let {
      name,
      email,
      password
    } = req.body;

    let validator = new Validator({
      name: name,
      email: email,
      password: password
    }, {
      name: 'required|min:4',
      email: 'required|email',
      password: 'required|min:8'
    });

    async function passes() {
      // Validation passed
      const user = await User.find({
        email: email
      }).limit(1);
      if (user.length >= 1) {
        res.send({
          status: 'failed',
          message: 'Already exists'
        });

      } else {
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
            message: 'Successfully Registered......',

          });

        } catch (e) {
          console.log(e);
          res.send({
            status: 'failed',
            message: 'Unable to Register',

          });

        }

      }
    }

    function fails() {
      // validator.errors.first('username');
      // console.log(validator.errors.all());
      let errors = validator.errors.all();
      let message = '';
      for (const error in errors) {
        message += errors[error];
      }
      console.log(message);
      res.send({
        status: 'invalid data',
        message: message,

      });
    }

    validator.checkAsync(passes, fails);


  },



  //For user login
  login: async (req, res) => {
    try {

      const email = req.body.email;
      const password = req.body.password;

      console.log(password);

      let validator = new Validator({
        email: email,
        password: password
      }, {
        email: 'required|email',
        password: 'required|min:8'
      });

      async function passes() {
        // Validation passed
       
        const user = await User.findOne({
          email: email
        });
        console.log(user);
        if (user !== undefined) {
          const ismatch = await bcrypt.compare(password, user.password);
          if (ismatch) {
            //genrate token
            const token = jwt.sign({
                userid: user._id
              },
              process.env.JWT_SECRET_KEY, {
                expiresIn: '5d'
              }
            );


            const updatedUser = await User.update({
              email: email
            }).set({
              isLogin: true
            }).fetch();

            req.app.locals.name = user.name;
            req.app.locals.email = user.email;
            req.app.locals.id = user.id;
            console.log(req.app.locals);

            res.send({
              status: 'success',
              message: 'Login Success',
              token: token,
              userDetails: updatedUser
              // becoz here we are passing user from
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
      }

      function fails() {
        let errors = validator.errors.all();
        let message = '';
        for (const error in errors) {
          message += errors[error];
        }

        res.send({
          status: 'invalid data',
          message: message
        });
      }

      validator.checkAsync(passes, fails);


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


  //To add Member to your account
  addMember: async (req, res) => {
    const user = await User.find({
      email: req.body.email
    });
    console.log(user);

    if (user.length > 0) {
      await Account.addToCollection(req.body.accountId, 'Users', user[0].id);
      res.send({
        message: 'Member added successfully'
      });
    } else {
      res.send({
        message: 'user with this email does not exist'
      });
    }

  },



  //To get all accounts
  getAccounts: async (req, res) => {
    console.log(req.app.locals.id);

    const user = await User.find({
      id: req.app.locals.id
    }).populate('Accounts');
    console.log(user);
    res.send({
      Accounts: user[0].Accounts
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
  deleteAccount: async (req, res) => {
    await Account.destroy({
      id: req.params.accountId,
    });
    res.send({
      message: 'Account deleted succesfully'
    });
  },



  //To Add Transaction 
  addTransaction: async (req, res) => {

    const transaction = await Transaction.create({
      transactionType: req.body.transactionType,
      Category: req.body.Category,
      amount: req.body.amount,
      account: req.body.accountId

    });

    const account = await Account.find({
      id: req.body.accountId
    });

    let Balance = account[0].Balance;
    if (req.body.transactionType === 'Income') {
      Balance = Balance + Number(req.body.amount);
    } else {
      Balance = Balance - Number(req.body.amount);
    }
    console.log(Balance);

    await Account.update({
      id: req.body.accountId
    }).set({
      Balance: Balance
    });

    res.send({
      message: 'Transaction Added Successfully'
    });

  },



  //get all Transaction list
  getAllTransaction: async (req, res) => {

    const account = await Account.find({
      id: req.body.accountId
    }).populate('Transaction');

    console.log(account[0].Transaction);
    console.log(account);
    const transaction = await Transaction.find({
      Transaction: req.body.transaction
    }).sort('createdAt DESC');

    res.send({
      Transaction: account[0].Transaction
    });
  },



  //To edit your Trasaction 
  editTransaction: async (req, res) => {
    const transaction = await Transaction.find({
      id: req.body.transactionId,
    });

    const account = await Account.find({
      id: req.body.accountId,
    });

    let Balance = 0;
    if (transaction[0].transactionType === 'Income') {
      Balance = account[0].Balance - transaction[0].amount;
      await Account.update({
        id: req.body.accountId,
      }).set({
        Balance: Balance,
      });
    } else if (transaction[0].transactionType === 'Expense') {
      Balance = account[0].Balance + transaction[0].amount;
      await Account.update({
        id: req.body.accountId,
      }).set({
        Balance: Balance,
      });
    }
    console.log('balance after removing effect og transaction', Balance);
    if (req.body.transactionType === 'Income') {
      Balance = Balance + Number(req.body.amount);
    } else if (req.body.transactionType === 'Expense') {
      Balance = Balance - Number(req.body.amount);
    }
    console.log('Balance after 2nd phase', Balance);
    await Account.update({
      id: req.body.accountId,
    }).set({
      Balance: Balance,
    });
    await Transaction.update({
      id: req.body.transactionId,
    }).set({
      transactionType: req.body.transactionType,
      amount: req.body.amount,
      Category: req.body.Category,
    });
    res.send({
      message: 'Your Transaction Updated succesfully..',
    });
  },



  //To Delete Transaction 
  deleteTransaction: async (req, res) => {
    await Transaction.destroy({
      id: req.params.transactionId,
    });
    if (req.body.transactionType === 'Income') {
      Balance = Balance + Number(req.body.amount);
    } else if (req.body.transactionType === 'Expense') {
      Balance = Balance - Number(req.body.amount);
    }
    await Account.update({
      id: req.body.accountId
    }).set({
      Balance: Balance
    });
    res.send({
      message: 'Transaction deleted succesfully'
    });
  }



};
