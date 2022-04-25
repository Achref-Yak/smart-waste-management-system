const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var path = require('path');
const nodemailer = require('nodemailer');
const employeeRoutes = require('./routes/employee')
const truckRoutes = require('./routes/truck')
const trashRoutes = require ('./routes/trash')
const reportRoutes = require ('./routes/report')
const clientRoutes = require ('./routes/client')





const app = express();
mongoose.connect('mongodb+srv://wael1:SBWxkMCNrjEuW2rm@cluster0.k3wgl.mongodb.net/mrclean?retryWrites=true&w=majority',
    { useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à  MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());
// app.use('/images', express.static(path.join(__dirname, 'images')));
// app.use('/api/stuff', stuffRoutes);
// app.use('/api/auth', userRoutes);
app.use('/productList', employeeRoutes);
app.use('/truckList', truckRoutes);
app.use('/trashList',trashRoutes);
app.use('/reportList',reportRoutes);
app.use('/clientList',clientRoutes);

//#region SEND MAIL
app.post((req, res) => {
    // Step 1
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'smarttrashtunisia@gmail.com', // TODO: your gmail account
            pass: 'smart1trash' // TODO: your gmail password
        }
    });

    // Step 2
    let mailOptions = {
        from: 'smarttrashtunisia@gmail.com', // TODO: email sender
        to: req.body.Email,
        subject: 'Trash Monitoring System',
        text: 'hello !! Thank you!!!',
        html: '<h1 style="color:blue;"> Smart Trash Tunisia  &#128151;</h1><p style="text-align-all: center"><h4>Automatic mail works perfectly !! </h4><br> Bonjour Votre reclamation est bien pris en consideration!<br>' +
            ' nous allons essayer de fixer le probleme le plus tot possible </p>' +
            '<h6>this is an automatic mail do not reply</h6>'
            
    };

    // Step 3
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            return console.log('Error occurs');
        }
        return console.log('Email sent!!!');
    });
});
//endregion



module.exports = app;
