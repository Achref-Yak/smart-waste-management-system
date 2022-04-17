const Employee = require('../models/Employee')


exports.createEmp = (req, res, next) => {
    // console.log(res.body.employee);
    const employeeObject = req.body;
    delete employeeObject._id;
    const employee = new Employee({
        ...employeeObject,
        // title: req.body.title,
        // description: req.body.description,
        // imageUrl: req.body.imageUrl,
        // price: req.body.price,
        // userId: req.body.userId
        // imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    employee.save()
        .then(() =>
            res.status(201).json({ message: 'Employee enregistré !'}))
        .catch(error =>
            res.status(400).json({ error }));
};


exports.modifyEmp = (req, res, next) => {
    console.log(req.body);
    const employee = new Employee({
        _id :  req.params.id,
        employeeName: req.body.employeeName,
        employeeEmail: req.body.employeeEmail,
        employeeJob: req.body.employeeJob,
        employeeSalary: req.body.employeeSalary,
        employeeCIN: req.body.employeeCIN,
        date: req.body.date,
    });
    Employee.updateOne({_id: req.params.id}, employee).then(() => {
            res.status(201).json({
                message: 'Thing updated successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};


exports.deleteEmp = (req, res, next) => {
    Employee.deleteOne({_id: req.params.id}).then(
        () => {
            res.status(200).json({
                message: 'Deleted!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

exports.getoneEmp = (req, res, next) => {
    Employee.findOne({_id: req.params.id})
        .then(employee => res.status(200).json(employee))
        .catch(error => res.status(404).json({error: error}))
};

exports.getallEmp = (req, res, next) => {
    Employee.find()
        .then(
            employees => res.status(200)
                .json(employees)
        )
        .catch(error => res.status(400).json({error: error}))
};
