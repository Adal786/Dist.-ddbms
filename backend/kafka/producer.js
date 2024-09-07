const { kafka } = require("./client");
const { Partitioners } = require('kafkajs');  // Import Kafka and Partitioners

const producer = kafka.producer();

async function run(para1, para2, para3, para4, para5, para6, para7) {
  try {
    await producer.connect({
        createPartitioner: Partitioners.LegacyPartitioner
    });

    console.log("Producer connected.");

    // Create the message with 7 parameters
    const messageValue = JSON.stringify({
      para1,
      para2,
      para3,
      para4,
      para5,
      para6,
      para7
    });

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

// Export the function for use elsewhere
module.exports = run;
