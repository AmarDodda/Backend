const jwt = require('jsonwebtoken');
const config = require('../utils/config');
const Consumer = require('../models/consumer');

const consumerAuth = {
  checkAuthConsumer: async (request, response, next) => {
    try {
      const token = request.cookies.token;
      console.log('Token:', token);


      if (!token) {
        return response.status(401).json({ message: 'Unauthorized' });
      }

      try {
        const decodedToken = jwt.verify(token, config.JWT_SECRET);
        console.log('Decoded Token:', decodedToken);
        

        
          request.consumerId = decodedToken.id;
        

        
        console.log('Request Consumer ID:', request.consumerId);
        next();
      } catch (error) {
        return response.status(401).json({ message: 'Invalid token' });
      }
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  }
};

module.exports = consumerAuth;
