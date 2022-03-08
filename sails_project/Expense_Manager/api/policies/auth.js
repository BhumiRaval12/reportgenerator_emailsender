const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  let token;
  const {
    authorization
  } = req.headers;
  if (authorization && authorization.startsWith('Bearer')) {
    try {
      //get token from header
      token = authorization.split(' ')[1];
      console.log(token);
      console.log(process.env.JWT_SECRET_KEY);

      //verify token
      const userid = jwt.verify(token, process.env.JWT_SECRET_KEY);
      console.log('secret', userid);

      //get user from token
      req.user = userid; //await User.findOne(userid).select('-password');
      console.log(req.user);
      return next();
    } catch (error) {
      res
        .status(401)
        .json({
          status: 'failed',
          message: 'Unauthorized user..'
        });
    }
  }
  if (!token) {
    res
      .status(401)
      .json({
        status: 'failed',
        message: 'Unauthorized user,No token'
      });
  }
};
