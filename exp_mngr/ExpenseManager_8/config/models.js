module.exports.models = {
  schema: true,
  migrate: 'alter',
  attributes: {
    createdAt: {
      type: 'number',
      autoCreatedAt: true,
    },
    updatedAt: {
      type: 'number',
      autoUpdatedAt: true,
    },
    id: {
      type: 'string',
      columnName: '_id',

    },

  },


  dataEncryptionKeys: {
    default: 'tlzRGRGs+fUMiUFYy8mmXwuifOq+UHaV02WLKJo/jXc='
  },



  cascadeOnDestroy: true


};
