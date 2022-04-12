const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const stuffRoutes = require('./routes/stuff');
// const userRoutes = require('./routes/user');
var path = require('path');
const employeeRoutes = require('./routes/employee')

const truckRoutes = require('./routes/truck')


const app = express();
mongoose.connect('mongodb://admin:password@127.0.0.1:27017',
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

module.exports = app;
