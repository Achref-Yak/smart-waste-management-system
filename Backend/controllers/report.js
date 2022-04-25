const Reports = require('../models/Report');


exports.createRep = (req, res, next) => {
    const reportObject = req.body;
    //delete reportObject._id;
    //console.log(reportObject);
    const report = new Reports({
        ...reportObject,
        
    });
    report.save()
        .then(() =>
            res.status(201).json({ message: 'report enregistré !'}))           
        .catch(error =>
            res.status(400).json({ error }));
            
};



exports.deleteRep = (req, res, next) => {
    Reports.deleteOne({_id: req.params.id}).then(
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

exports.getoneRep = (req, res, next) => {
    Reports.findOne({_id: req.params.id})
        .then(Reports => res.status(200).json(Reports))
        .catch(error => res.status(404).json({error: error}))
};

exports.getallRep = (req, res, next) => {
    Reports.find()
        .then(
            report => res.status(200)
                .json(report)
        )
        .catch(error => res.status(400).json({error: error}))
};
