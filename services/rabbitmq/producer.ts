// services/subreddits-service/src/producer.ts

import amqp from 'amqplib';

export const sendMessage = async (queue: string, message: any) => {
    const connection = await amqp.connect('amqp://localhost'); // Connect to RabbitMQ
    const channel = await connection.createChannel();
    await channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), { persistent: true });
    console.log(`Sent message to ${queue}:`, message);
    await channel.close();
    await connection.close();
};
