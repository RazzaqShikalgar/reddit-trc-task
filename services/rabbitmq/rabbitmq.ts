// services/rabbitmq/rabbitmq.ts
import amqp from 'amqplib';

let channel: amqp.Channel;

export const connectRabbitMQ = async () => {
    try {
        const connection = await amqp.connect('amqp://localhost');
        channel = await connection.createChannel();
        console.log('Connected to RabbitMQ');
    } catch (error) {
        console.error('Error connecting to RabbitMQ:', error);
    }
};

export const getChannel = () => {
    if (!channel) {
        throw new Error('Channel not initialized');
    }
    return channel;
};
