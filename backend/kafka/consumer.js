const { kafka } = require("./client");
const mongoose = require('mongoose');
const History = require('../models/historyModel'); // Adjust the path as necessary

const consumer = kafka.consumer({ groupId: 'test-group' });

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/abcd', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected."))
  .catch((err) => console.error("MongoDB connection error:", err));

async function run() {
  try {
    await consumer.connect();
    console.log("Consumer connected.");

    await consumer.subscribe({ topic: 'request-in', fromBeginning: true });
    console.log("Subscribed to topic.");

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const messageValue = JSON.parse(message.value.toString());

        // Extract relevant data from the message
        const { nlp_start, nlp_end, request_in, request_ret, userId, query, results } = messageValue;

        console.log('Extracted Data:', {
          nlp_start, nlp_end, request_in, request_ret, userId, query, results
        });

        // Create a new history entry
        const historyEntry = new History({
          // These fields need to be adjusted according to your data
          response: results, // Assuming these are part of the response
          userId,
          query,
          nlp_end,
          nlp_start,
          request_ret,
          request_in,
        });

        // Save the history entry to MongoDB
        try {
          await historyEntry.save();
          console.log('History entry saved:', historyEntry);
        } catch (err) {
          console.error('Error saving history entry:', err);
        }
      },
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

// Execute the async function
run();
