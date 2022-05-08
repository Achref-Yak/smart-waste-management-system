const express = require('express');
const router = express.Router();

const employeeCtrl = require('../controllers/trash');





router.get('/', employeeCtrl.getallTrash);
router.get('/getdestinations/:multiple/:lon/:lat', employeeCtrl.getDest);

router.post('/', employeeCtrl.createTrash);
// router.get('/:id', employeeCtrl.getoneEmp);
router.put('/:id', employeeCtrl.modifyTrash);
router.delete('/:id', employeeCtrl.deleteTrash);

module.exports = router;
