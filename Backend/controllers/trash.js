const Trash = require('../models/Trash')


exports.createTrash = (req, res, next) => {
    // console.log(res.body.trash);
    const trashObject = req.body;
    //delete trashObject._id;
    const trash = new Trash({
        ...trashObject,
        // title: req.body.title,
        // description: req.body.description,
        // imageUrl: req.body.imageUrl,
        // price: req.body.price,
        // userId: req.body.userId
        // imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    trash.save()
        .then(() =>
            res.status(201).json({ message: 'Trash enregistré !'}))
        .catch(error =>
            res.status(400).json({ error }));
};


exports.modifyTrash = (req, res, next) => {
    //console.log(req.params);
    const trash = new Trash({
        _id: req.body._id,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        size: req.body.size,
        date: req.body.date,

    });
    Trash.updateOne({_id: req.body._id}, trash).then(() => {
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


exports.deleteTrash = (req, res, next) => {
    Trash.deleteOne({_id: req.params.id}).then(
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

exports.getoneTrash = (req, res, next) => {
    Trash.findOne({_id: req.params.id})
        .then(trash => res.status(200).json(trash))
        .catch(error => res.status(404).json({error: error}))
};

exports.getallTrash = (req, res, next) => {
    Trash.find()
        .then(
            trash => res.status(200)
                .json(trash)
        )
        .catch(error => res.status(400).json({error: error}))
};
