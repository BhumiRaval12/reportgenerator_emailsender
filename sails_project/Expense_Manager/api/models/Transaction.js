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
    ammount: {
      type: 'number',
      required: true
    }
  }
};
