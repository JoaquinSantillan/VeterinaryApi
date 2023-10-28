
const jwt = require('jsonwebtoken');
const User = require('../apiservices/User/model')
require('dotenv').config()



const auth = async (req, res, next) => {
      try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
          return res.status(401).json({ errorMessage: 'Unauthorized: No token provided' });
        }
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
    
        if (!user) {
          throw new Error();
        }

        req.token = token;
        req.user = user;
        next();
      } catch (error) {
        res.status(401).json({ errorMessage: 'Unauthorized: Invalid token' });
      }
    };
    
    module.exports = auth;