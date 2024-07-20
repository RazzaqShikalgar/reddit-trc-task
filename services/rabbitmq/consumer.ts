// services/subreddits-service/src/consumer.ts

import amqp from 'amqplib';

export const consumeMessages = async (queue: string) => {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue(queue, { durable: true });

    channel.consume(queue, (msg) => {
        if (msg) {
            const message = JSON.parse(msg.content.toString());
            console.log(`Received message from ${queue}:`, message);
            // Handle the message (e.g., create a subreddit)
            channel.ack(msg); // Acknowledge the message
        }
    }, { noAck: false });
};
