const Truck = require('../models/Truck')


exports.createTruck = (req, res, next) => {
    // console.log(res.body.TRUCK);
    const truckObject = req.body;
    delete truckObject._id;
    const truck = new Truck({
        ...truckObject,
        // title: req.body.title,
        // description: req.body.description,
        // imageUrl: req.body.imageUrl,
        // price: req.body.price,
        // userId: req.body.userId
        // imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    truck.save()
        .then(() =>
            res.status(201).json({ message: 'truck enregistré !'}))
        .catch(error =>
            res.status(400).json({ error }));
};


exports.modifyTruck = (req, res, next) => {
    const truck = new Truck({
        _id :  req.params.id,
        RegNumber: req.body.RegNumber,
        TruckBrand: req.body.TruckBrand,
        TankVolume: req.body.TankVolume,
        FirstDriver: req.body.FirstDriver,
        SecondDriver: req.body.SecondDriver,
        RecruitmentDate: req.body.RecruitmentDate,
    });
    Truck.updateOne({_id: req.params.id}, truck).then(() => {
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


exports.deleteTruck = (req, res, next) => {
    Truck.deleteOne({_id: req.params.id}).then(
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

exports.getoneTruck = (req, res, next) => {
    Truck.findOne({_id: req.params.id})
        .then(truck => res.status(200).json(truck))
        .catch(error => res.status(404).json({error: error}))
};

exports.getallTruck = (req, res, next) => {
    Truck.find()
        .then(
            trucks => res.status(200)
                .json(trucks)
        )
        .catch(error => res.status(400).json({error: error}))
};
