const express = require('express');
const ReportRouter = express.Router();

const reportCtrl = require('../controllers/report');

ReportRouter.get('/', reportCtrl.getallRep);
ReportRouter.post('/', reportCtrl.createRep);
//ReportRouter.put('/:id', reportCtrl.modifyRep);
ReportRouter.delete('/:id', reportCtrl.deleteRep);

module.exports = ReportRouter;
