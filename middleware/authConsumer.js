// const jwt = require('jsonwebtoken');
// const config = require('../utils/config');
// const Consumer = require('../models/consumer');

// const consumerAuth = {
//     // Middleware to check if the user is authenticated and has a valid token
//     checkAuthConsumer: (request, response, next) => {
//         try {
//             // Get the token from the request cookies
//             const token = request.cookies.token;

//             // If the token is not present, return an error
//             if (!token) {
//                 return response.status(401).json({ message: 'Unauthorized' });
//             }

//             // Verify the token
//             try {
//                 const decodedToken = jwt.verify(token, config.JWT_SECRET);

//                 // Set the consumerId in the request object
//                 request.consumerId = decodedToken.consumerId;

//                 // Call the next middleware
//                 next();
//             } catch (error) {
//                 return response.status(401).json({ message: 'Invalid token' });
//             }
//         } catch (error) {
//             response.status(500).json({ message: error.message });
//         }
//     },

//     // Middleware to check if the user is a consumer
//     isConsumer: async (request, response, next) => {
//         try {
//             // Get the consumerId from the request object
//             const consumerId = request.consumerId;

//             // Find the consumer by id in the database
//             const consumer = await Consumer.findById(consumerId);

//             // If the consumer is not found, return an error
//             if (!consumer) {
//                 return response.status(403).json({ message: 'Forbidden' });
//             }

//             // If the consumer is found, call the next middleware
//             next();
//         } catch (error) {
//             response.status(500).json({ message: error.message });
//         }
//     }
// };

// module.exports = consumerAuth;

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
