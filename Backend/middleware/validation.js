/**
 * Request Validation Middleware
 * Provides validation for different API endpoints
 * @module middleware/validation
 */

/**
 * Validates trash bin data in requests
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const validateTrashBin = (req, res, next) => {
    const { location, capacity, type, status } = req.body;

    // Validate required fields
    if (!location || !capacity || !type) {
        return res.status(400).json({
            error: 'Missing required fields',
            required: ['location', 'capacity', 'type']
        });
    }

    // Validate location coordinates
    if (!location.latitude || !location.longitude) {
        return res.status(400).json({
            error: 'Invalid location format',
            required: {
                latitude: 'number',
                longitude: 'number'
            }
        });
    }

    // Validate capacity
    if (typeof capacity !== 'number' || capacity <= 0) {
        return res.status(400).json({
            error: 'Invalid capacity value',
            requirements: 'Capacity must be a positive number'
        });
    }

    // Validate type
    const validTypes = ['general', 'recyclable', 'organic', 'hazardous'];
    if (!validTypes.includes(type)) {
        return res.status(400).json({
            error: 'Invalid trash bin type',
            validTypes
        });
    }

    // Validate status if provided
    if (status) {
        const validStatuses = ['active', 'inactive', 'maintenance'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                error: 'Invalid status value',
                validStatuses
            });
        }
    }

    next();
};

/**
 * Validates pagination parameters
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const validatePagination = (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    if (page < 1) {
        return res.status(400).json({
            error: 'Invalid page number',
            message: 'Page number must be greater than 0'
        });
    }

    if (limit < 1 || limit > 100) {
        return res.status(400).json({
            error: 'Invalid limit value',
            message: 'Limit must be between 1 and 100'
        });
    }

    req.pagination = { page, limit };
    next();
};

/**
 * Validates coordinate parameters
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const validateCoordinates = (req, res, next) => {
    const { lat, lon } = req.params;

    const latitude = parseFloat(lat);
    const longitude = parseFloat(lon);

    if (isNaN(latitude) || latitude < -90 || latitude > 90) {
        return res.status(400).json({
            error: 'Invalid latitude',
            message: 'Latitude must be between -90 and 90 degrees'
        });
    }

    if (isNaN(longitude) || longitude < -180 || longitude > 180) {
        return res.status(400).json({
            error: 'Invalid longitude',
            message: 'Longitude must be between -180 and 180 degrees'
        });
    }

    req.coordinates = { latitude, longitude };
    next();
};

module.exports = {
    validateTrashBin,
    validatePagination,
    validateCoordinates
}; 