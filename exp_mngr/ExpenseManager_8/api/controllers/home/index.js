module.exports = {
  friendlyName: 'Index',
  description: 'Index home.',
  inputs: {
    fullName: {
      type: 'string',
      required: true,
    },
    email: {
      type: 'string',
      required: true,
      unique: true,
      isEmail: true,
    },
    password: {
      type: 'string',
      required: true,
      minLength: 7,
    },
  },
  exits: {
    success: {
      statusCode: 201,
      description: 'New user created',
    },
    emailAlreadyInUse: {
      statusCode: 400,
      description: 'Email already in use!',
    },
    error: {
      description: 'Something went wrong, try again',
    },
  },
  fn: async function (_, exits) {
    // All done.
    try {
      const newEmailAddress = inputs.email.toLowerCase();
      let newUser = await User.create({
        fullName: inputs.fullName,
        email: newEmailAddress,
        password: inputs.password,
      });
      return exits.success({
        message: `${newUser}}account created successfully`,
      });
    } catch (error) {
      if (error.code === 'E_UNIQUE') {
        return exits.emailAlreadyInUse({
          message: 'Oops :) an error occurred',
          error: 'This email already exits',
        });
      }
      return exits.error({
        message: 'Oops :) an error occurred',
        error: error.message,
      });
    }
  }
};
