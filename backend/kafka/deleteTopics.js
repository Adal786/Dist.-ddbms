const { kafka } = require('./client');

const admin = kafka.admin();

async function run() {
  try {
    // Connect to the Kafka admin
    await admin.connect();
    console.log("Admin connected.");

    // List all topics
    const topics = await admin.listTopics();
    console.log("Topics to delete:", topics);

    if (topics.length > 0) {
      // Delete all topics
      await admin.deleteTopics({
        topics: topics,
        timeout: 5000,  // Adjust timeout if necessary
      });

      console.log("All topics deleted.");
    } else {
      console.log("No topics found to delete.");
    }

  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Disconnect from the Kafka admin
    await admin.disconnect();
    console.log("Admin disconnected.");
  }
}

run();
