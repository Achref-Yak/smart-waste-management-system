# Smart Waste Management System

A real-time IoT-based solution for efficient city waste management using MEAN stack and AWS services.

## Overview

This smart waste management system enables real-time monitoring and tracking of trash bins across a city using IoT sensors. The system helps optimize waste collection routes, reduce operational costs, and improve urban cleanliness through smart technology.

## Features

- Real-time trash bin monitoring
- Fill level tracking and predictions
- Temperature monitoring
- Location tracking and geofencing
- Route optimization for waste collection
- Analytics dashboard
- Smart notifications and alerts

## Technology Stack

### Frontend
- Angular 12
- Bootstrap 5.1.3
- WebSocket client for real-time updates

### Backend
- Node.js with Express.js
- MongoDB with Mongoose
- WebSocket server for real-time communication

### Cloud Infrastructure
- AWS IoT Core for device management
- AWS Lambda for serverless computing
- Amazon DynamoDB for sensor data storage
- AWS WebSocket API for real-time communication

### IoT Components
- Smart sensors for fill level detection
- Temperature sensors
- GPS modules for location tracking
- MQTT protocol for device communication

## Project Structure

```
.
├── Backend/           # Express.js server implementation
├── frontservice/      # Angular frontend application
├── infra/            # Infrastructure as Code (AWS)
├── trash-ml/         # Machine Learning models
├── driver/           # Driver application
└── db.json           # Database configuration
```

## Setup Instructions

1. **Prerequisites**
   - Node.js (v14 or higher)
   - MongoDB
   - AWS Account
   - Angular CLI

2. **Backend Setup**
   ```bash
   cd Backend
   npm install
   npm start
   ```

3. **Frontend Setup**
   ```bash
   cd frontservice
   npm install
   ng serve
   ```

4. **Environment Configuration**
   - Configure AWS credentials
   - Set up MongoDB connection
   - Configure IoT device parameters

## API Documentation

The API documentation is available at `/api/docs` when running the backend server.

## Machine Learning Component

The system uses machine learning models to:
- Predict fill levels
- Optimize collection routes
- Detect anomalies in sensor data

## Demo

Watch our explainer video: [Smart Waste Management System Demo](https://vimeo.com/726337588)

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
