/**
 * HTTP server configuration for Smart Waste Management System
 * Handles server creation, port normalization, and error management
 */

const http = require('http');
const app = require('./app');

/**
 * Normalize port into a number, string, or false
 * @param {string|number} val - The port value to normalize
 * @returns {number|string|boolean} - Normalized port value
 */
const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};

// Set up port configuration
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Error handler for HTTP server
 * @param {Error} error - The error object
 */
const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges.`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use.`);
            process.exit(1);
            break;
        default:
            throw error;
    }
};

// Create HTTP server
const server = http.createServer(app);

// Error handling
server.on('error', errorHandler);

// Server listening handler
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log(`Server is listening on ${bind}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown handling
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received. Closing HTTP server...');
    server.close(() => {
        console.log('HTTP server closed');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('SIGINT signal received. Closing HTTP server...');
    server.close(() => {
        console.log('HTTP server closed');
        process.exit(0);
    });
});

// Start server
server.listen(port);
