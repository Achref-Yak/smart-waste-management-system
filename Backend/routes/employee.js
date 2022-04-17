const express = require('express');
const router = express.Router();

const employeeCtrl = require('../controllers/employee');

router.get('/', employeeCtrl.getallEmp);
router.post('/', employeeCtrl.createEmp);
// router.get('/:id', employeeCtrl.getoneEmp);
router.put('/:id', employeeCtrl.modifyEmp);
router.delete('/:id', employeeCtrl.deleteEmp);

module.exports = router;
