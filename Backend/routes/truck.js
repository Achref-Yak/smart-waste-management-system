const express = require('express');
const TruckRouter = express.Router();

const truckCtrl = require('../controllers/truck');

TruckRouter.get('/', truckCtrl.getallTruck);
TruckRouter.post('/', truckCtrl.createTruck);

TruckRouter.put('/:id', truckCtrl.modifyTruck);
TruckRouter.delete('/:id', truckCtrl.deleteTruck);

module.exports = TruckRouter;
