const amqp = require('amqplib');

async function sendMessage() {
    try {
        const conn = await amqp.connect('amqp://guest:guest@127.0.0.1');

        const channel = await conn.createChannel();
        const queue = 'testQueue';
        await channel.assertQueue(queue, { durable: false });
        const message = 'Hello RabbitMQ';
        channel.sendToQueue(queue, Buffer.from(message));
        console.log("Sent '%s'", message);
        await channel.close();
        await conn.close();
    } catch (error) {
        console.error("Failed to send message:", error);
    }
}
