/**
 * Authentication Middleware
 * Provides JWT-based authentication for protected routes
 * @module middleware/auth
 */

const jwt = require('jsonwebtoken');

/**
 * Validates JWT token and adds user data to request
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                error: 'Authentication failed',
                message: 'No token provided'
            });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.userData = {
            userId: decodedToken.userId,
            role: decodedToken.role
        };

        next();
    } catch (error) {
        return res.status(401).json({
            error: 'Authentication failed',
            message: 'Invalid token'
        });
    }
};

/**
 * Checks if user has required role
 * @param {string[]} allowedRoles - Array of roles allowed to access the route
 * @returns {Function} Middleware function
 */
const authorize = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.userData || !req.userData.role) {
            return res.status(403).json({
                error: 'Authorization failed',
                message: 'User role not found'
            });
        }

        if (!allowedRoles.includes(req.userData.role)) {
            return res.status(403).json({
                error: 'Authorization failed',
                message: 'Insufficient permissions'
            });
        }

        next();
    };
};

/**
 * Rate limiting for authentication attempts
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const authRateLimit = (req, res, next) => {
    // Implementation depends on your rate limiting strategy
    // Could use Redis, memory store, or a rate limiting package
    next();
};

module.exports = {
    authenticate,
    authorize,
    authRateLimit
}; 