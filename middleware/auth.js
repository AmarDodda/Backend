const jwt = require('jsonwebtoken');
const config = require('../utils/config');
const User = require('../models/user');
const Consumer = require('../models/consumer');

const auth = {
    // middleware to check if the user is authenticated has a valid token
    checkAuth: (request, response, next) => {
        try {
            // get the token from the request cookies
            const token = request.cookies.token;

            console.log(token);

            // if the token is not present, return an error
            if (!token) {
                return response.status(401).json({ message: 'Unauthorized' });
            }

            // verify the token
            try {
                const decodedToken = jwt.verify(token, config.JWT_SECRET);
                console.log('Decoded Token:', decodedToken);

            

                // set the userId in the request object
                request.userId = decodedToken.id;

                // call the next middleware
                next();
            } catch(error) {
                return response.status(401).json({ message: 'Invalid token' });
            }
        } catch (error) {
            response.status(500).json({ message: error.message });
        }

        // try {
        //     const token = request.cookies.token;

        //     if (!token) {
        //         return response.status(401).json({ message: 'Unauthorized' });
        //     }

        //     const decodedToken = jwt.verify(token, config.JWT_SECRET);
           
        //     if (decodedToken.role === 'consumer') {
        //         const consumer = Consumer.findById(decodedToken.consumerId);
        //         if (!consumer) {
        //             return response.status(404).json({ message: 'Consumer not found' });
        //         }

        //         // Set consumerId and role in the request object
        //         request.consumerId = decodedToken.consumerId;
        //         request.role = consumer.role; // Include consumer's role

        //     } else if (decodedToken.role === 'admin') {
        //         const user = User.findById(decodedToken.id);
        //         if (!user) {
        //             return response.status(404).json({ message: 'Admin not found' });
        //         }
        //         request.userId = decodedToken.id;
        //         request.role = 'admin'; // Set role as 'admin' for admins

        //     } else {
        //         return response.status(403).json({ message: 'Forbidden' });
        //     }

        //     next();
        // } catch (error) {
        //     response.status(500).json({ message: error.message });
        // }
    },
    
    // middleware to check if the user is an admin
    isAdmin: async (request, response, next) => {
        try {
            // Get the user id from the request object
            const userId = request.userId;

            // Find the user by id in the database
            const user = await User.findById(userId);

            // If the user is not an admin, return an error
            if(user.role !== 'admin') {
                return response.status(403).json({ message: 'Forbidden' });
            }

            // if the user is an admin, call the next middleware
            next();
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    }
}

// export the auth object
module.exports = auth;