module.exports = {

  attributes: {
    Accountname: {
      type: 'string',
      required: true
    },
    Members: {
      type: 'json',
      columnType: 'array'
    },
    Balance: {
      type: 'Number'
    },

    Users: {
      collection: 'user',
      via: 'Accounts',
      through: 'UserAccount',
    },
    Transaction: {
      collection: 'Transaction',
      via: 'account'
    },
  }
};
