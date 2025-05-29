/**
 * Trash Bin Management Routes
 * Handles all routes related to trash bin operations
 * @module routes/trash
 */

const express = require('express');
const router = express.Router();
const trashController = require('../controllers/trash');
const { validateTrashBin } = require('../middleware/validation');
const { authenticate } = require('../middleware/auth');

/**
 * @route GET /api/trash-bins
 * @description Get all trash bins
 * @access Public
 */
router.get('/', trashController.getallTrash);

/**
 * @route GET /api/trash-bins/destinations/:multiple/:lon/:lat
 * @description Get nearest trash bin destinations based on coordinates
 * @param {string} multiple - Multiple factor for search radius
 * @param {string} lon - Longitude coordinate
 * @param {string} lat - Latitude coordinate
 * @access Public
 */
router.get('/destinations/:multiple/:lon/:lat', trashController.getDest);

/**
 * @route POST /api/trash-bins
 * @description Create a new trash bin
 * @access Private
 */
router.post('/', authenticate, validateTrashBin, trashController.createTrash);

/**
 * @route PUT /api/trash-bins/:id
 * @description Update a trash bin by ID
 * @param {string} id - Trash bin ID
 * @access Private
 */
router.put('/:id', authenticate, validateTrashBin, trashController.modifyTrash);

/**
 * @route DELETE /api/trash-bins/:id
 * @description Delete a trash bin by ID
 * @param {string} id - Trash bin ID
 * @access Private
 */
router.delete('/:id', authenticate, trashController.deleteTrash);

module.exports = router;
