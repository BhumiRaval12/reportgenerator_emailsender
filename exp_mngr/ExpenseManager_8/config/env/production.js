module.exports = {



  datastores: {


    default: {




    },

  },



  models: {


    migrate: 'safe',



  },


  blueprints: {
    shortcuts: false,
  },




  security: {


    cors: {
      // allowOrigins: [
      //   'https://example.com',
      // ]
    },

  },


  session: {




    cookie: {
      // secure: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },

  },



  sockets: {


    // onlyAllowOrigins: [
    //   'https://example.com',
    //   'https://staging.example.com',
    // ],





  },

  log: {
    level: 'debug'
  },



  http: {


    cache: 365.25 * 24 * 60 * 60 * 1000, // One year



  },




  custom: {
    baseUrl: 'https://example.com',
    internalEmailAddress: 'support@example.com',

  },



};
