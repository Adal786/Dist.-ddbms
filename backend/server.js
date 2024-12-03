const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const historyRoutes = require('./routes/historyRoutes');
const rawQueryRoutes = require('./routes/rawQueryRoutes'); // Import raw query routes
const { MONGO_URI } = require('./config/config');
const sequelize = require('./config/mysql'); // Import MySQL connection
const userRoutes = require('./routes/userRoutes');
const dataRoutes = require('./routes/dataRoutes');


const app = express();

// Enable CORS
app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.use('/api', authRoutes);
app.use('/api', historyRoutes);
app.use('/api', rawQueryRoutes);
app.use('/api', dataRoutes);
app.use('/api', userRoutes);
app.use('api', dataRoutes);



const PORT = process.env.PORT || 8000;

mongoose.connect(MONGO_URI)
    .then(() => {
        // Connect to MySQL before starting the server
        sequelize.authenticate()
            .then(() => {
                console.log('MySQL connection established successfully.');
                app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
            })
            .catch(err => {
                console.error('Unable to connect to the MySQL database:', err);
                process.exit(1); // Exit if MySQL connection fails
            });
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error.message);
        process.exit(1); // Exit if MongoDB connection fails
    });
