const Client = require('../models/Client')


exports.createCli = (req, res, next) => {
    const clientObject = req.body;
    delete clientObject._id;
    const client = new Client({
        ...clientObject,
       
    });
    client.save()
        .then(() =>
            res.status(201).json({ message: 'Client enregistré !'}))
        .catch(error =>
            res.status(400).json({ error }));
};


exports.modifyCli = (req, res, next) => {
    console.log(req.body);
    const client = new Client({
        _id :  req.params.id,
        clientName: req.body.clientName,
        clientEmail: req.body.clientEmail,
        clientAddress: req.body.clientAddress,
        clientType: req.body.clientType,
        clientCIN: req.body.clientCIN,
        client_trushSize: req.body.client_trushSize,
        client_trash_id: req.body.client_trash_id,
    });
    Client.updateOne({_id: req.params.id}, client).then(() => {
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


exports.deleteCli = (req, res, next) => {
    Client.deleteOne({_id: req.params.id}).then(
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

exports.getoneCli = (req, res, next) => {
    Client.findOne({_id: req.params.id})
        .then(client => res.status(200).json(client))
        .catch(error => res.status(404).json({error: error}))
};

exports.getallCli = (req, res, next) => {
    Client.find()
        .then(
            client => res.status(200)
                .json(client)
        )
        .catch(error => res.status(400).json({error: error}))
};
