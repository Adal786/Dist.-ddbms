const sequelize = require('../config/mysql');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');
const pretrained_model = require("../pretrained_model")
const { kafka } = require("../kafka/client");
const { Partitioners } = require('kafkajs');  // Import Kafka and Partitioners

const producer = kafka.producer();


async function run(nlp_start, nlp_end, request_in, request_ret, userId, query, results) {
    try {
        // Connect to Kafka producer
        await producer.connect({
            createPartitioner: Partitioners.LegacyPartitioner
        });

        console.log("Producer connected.");

        // Create the Kafka message with all parameters
        const messageValue = JSON.stringify({
            nlp_start,
            nlp_end,
            request_in,
            request_ret,
            userId,
            query,
            results
        });

        // Send the message to Kafka topic
        await producer.send({
            topic: 'request-in',
            messages: [
                { value: messageValue },
            ],
        });

        console.log("Message sent.");

    } catch (error) {
        console.error("Error:", error);
    } finally {
        await producer.disconnect();
        console.log("Producer disconnected.");
    }
}

exports.executeRawQuery = async (req, res) => {
    const request_in = new Date();
    const { query } = req.body;
    const { id } = req.params;
 
    const userId = id;
 
    if (!query) {
        return res.status(400).json({ error: 'Query is required.' });
    }

    try {
        // Execute raw SQL query
        const nlp_start = new Date();
        const results = await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT
        });
        const nlp_end = new Date();
        const request_ret = new Date();
        
        await run(nlp_start, nlp_end, request_in, request_ret, userId, query, results);
        res.status(200).json({ results, response: { nlp_start, request_in, request_ret, nlp_end } });
    } catch (error) {
        console.error('Error executing raw query:', error.message);
        res.status(500).json({ error: 'Invalid Query, An error occurred while executing the query.' });
    }
};



exports.query = async (req, res) => {
    const request_in = new Date();
    const { query } = req.body;
    const { id } = req.params;
 
    const userId = id;

    if (!query) {
        return res.status(400).json({ error: 'User input is required.' });
    }
    if (!id) {
        return res.status(400).json({ error: 'Error user Id missing.' });
    }

    try {
        const nlp_start = new Date();
        const modelResponse = await pretrained_model(query);
        const nlp_end = new Date();
        const request_ret = new Date();
        
        await run(nlp_start, nlp_end, request_in, request_ret, userId, query, modelResponse);
        res.status(200).json({ modelResponse, response: { nlp_start, request_in, request_ret, nlp_end } });
    } catch (error) {
        console.error('Error calling pretrained model:', error.message);
        res.status(500).json({ error: 'An error occurred while processing the request.' });
    }
};
