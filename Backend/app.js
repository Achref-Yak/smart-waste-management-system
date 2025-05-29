/**
 * Main application file for Smart Waste Management System
 * Handles Express configuration, middleware setup, and route management
 */

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const nodemailer = require('nodemailer');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Import routes
const employeeRoutes = require('./routes/employee');
const truckRoutes = require('./routes/truck');
const trashRoutes = require('./routes/trash');
const reportRoutes = require('./routes/report');
const clientRoutes = require('./routes/client');

// Initialize Express app
const app = express();

// Load environment variables
require('dotenv').config({
    path: path.join(__dirname, '.env')
});

// Configure security middleware
app.use(helmet());
app.use(cors({
    origin: process.env.ALLOWED_ORIGINS || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content', 'Accept', 'Content-Type', 'Authorization']
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connection successful'))
.catch((err) => console.error('MongoDB connection failed:', err.message));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API Routes
app.use('/api/employees', employeeRoutes);
app.use('/api/trucks', truckRoutes);
app.use('/api/trash-bins', trashRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/clients', clientRoutes);

/**
 * Email notification endpoint
 * Sends automated responses to user complaints
 * @route POST /api/notifications/email
 */
app.post("/api/notifications/email", async (req, res) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: req.body.email,
            subject: 'Trash Monitoring System - Complaint Received',
            html: `
                <h1 style="color: #2196F3;">Trash-Net Tunisia</h1>
                <p>Hello,</p>
                <p>Your complaint has been received and will be addressed promptly. We aim to resolve the issue as soon as possible.</p>
                <img src="${process.env.LOGO_URL}" alt="Trash-Net Logo">
                <p style="font-size: 12px; color: #666;">This is an automated message. Please do not reply.</p>
            `
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Email sending failed:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;
