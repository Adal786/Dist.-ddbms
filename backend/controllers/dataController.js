// controllers/dataController.js
const mysqlConnection = require('../config/mysql');

exports.getAllData = (req, res) => {
    const query = 'SELECT * FROM data ORDER BY id ASC LIMIT 20 ';

    mysqlConnection.query(query, (error, results) => {
        if (error) {
            console.error('Error executing query:', error.message);
            return res.status(500).json({ error: 'Database query failed' });
        }

        res.status(200).json(results);
    });
};
