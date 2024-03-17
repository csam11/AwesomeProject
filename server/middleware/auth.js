const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
    // Get the token from the header if present
    const token = req.header('x-auth-token');
    // If no token is found, return response without access
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    try {
        // If the token is found, verify and decode it
        const decoded = jwt.verify(token, 'jwtPrivateKey'); // note: this should be config.get('jwtPrivateKey')
        // Add user from payload
        req.user = decoded;
        next();
    } catch (ex) {
        // If the token is invalid, return response without access
        res.status(400).json({ message: 'Invalid token.' });
    }
}

