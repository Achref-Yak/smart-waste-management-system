const express = require('express');
const ClientRouter = express.Router();

const clientCtrl = require('../controllers/client');

ClientRouter.get('/', clientCtrl.getallCli);
ClientRouter.post('/', clientCtrl.createCli);
ClientRouter.put('/:id', clientCtrl.modifyCli);
ClientRouter.delete('/:id', clientCtrl.deleteCli);

module.exports = ClientRouter;
