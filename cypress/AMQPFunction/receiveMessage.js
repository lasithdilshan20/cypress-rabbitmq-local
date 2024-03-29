const amqp = require('amqplib');

async function receiveMessage() {
    try {
        const conn = await amqp.connect('amqp://guest:guest@127.0.0.1');

        const channel = await conn.createChannel();
        const queue = 'testQueue';

        await channel.assertQueue(queue, { durable: false });

        console.log(" [*] Waiting for messages in %s.", queue);
        const msg = await new Promise((resolve) => channel.consume(queue, (msg) => resolve(msg), { noAck: true }));

        if (msg) {
            console.log("Received:", msg.content.toString());
        } else {
            console.log("No message received.");
        }

        await channel.close();
        await conn.close();
        process.exit(0); // Ensure the script exits whether a message was received or not.
    } catch (error) {
        console.error("Failed to connect or listen for messages:", error);
        process.exit(1);
    }
}

receiveMessage();
