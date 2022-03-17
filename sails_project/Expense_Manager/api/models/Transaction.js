module.exports = {

  attributes: {
    transactionType: {
      type: 'string',
      isIn: ['Expense', 'Income', 'Transfer'],
      required: true
    },
    Category: {
      type: 'String',
      required: true
    },
 
    amount: {
      type: 'number',
      required: true
    },
    account: {
      model: 'account'
    }

  }
};
