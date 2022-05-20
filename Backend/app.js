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
app.post("/mail",(req, res) => {
    // Step 1
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'trash.net00@gmail.com', // TODO: your gmail account
            pass: 'trashnet123' // TODO: your gmail password
        }
    });

    // Step 2
    let mailOptions = {
        from: 'trash.net00@gmail.com', // TODO: email sender
        to: req.body.Email,
        subject: 'Trash Monitoring System',
        text: 'hello !! Thank you!!!',
        html: '<h1 style="color:blue;">  Trash-Net Tunisia  &#128151;</h1><p style="text-align-all: center"><br> <h1>Hello Your complaint has been taken into consideration!</h1><br>' +
            '<h1> we will try to fix the problem as soon as possible </h1></p>' +
            '<img src="https://raw.githubusercontent.com/Achref-Yak/smarttrash-microservices/main/frontservice/src/assets/Trashnet.png?token=GHSAT0AAAAAABUT3GBQC6YSZLF72EG4DZQEYUCZT2A">'+
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
