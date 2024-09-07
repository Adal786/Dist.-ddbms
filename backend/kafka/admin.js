const {kafka} = require("./client");

const admin = kafka.admin();

async function run() {
    try {
        // Connect to the Kafka admin
        await admin.connect();
        console.log("Admin connected.");

        // Create the topics
        await admin.createTopics({
            validateOnly: false,
            waitForLeaders: true,
            timeout: 5000,
            topics: [{
                topic: "request-in"
            }]
        });

        console.log("Topic created.");

    } catch (error) {
        console.error("Error:", error);
    } finally {
        // Disconnect from the Kafka admin
        await admin.disconnect();
        console.log("Admin disconnected.");
    }
}

run();
