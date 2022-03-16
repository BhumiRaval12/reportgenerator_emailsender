module.exports = {

  attributes: {
    transactionType: {
      type: 'string',
      isIn: ['Expense', 'Income'],
      required: true
    },

    ammount: {
      type: 'number',
      required: true
    }
  }
};
