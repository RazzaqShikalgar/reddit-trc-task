// services/rabbitmq/consumer.ts
import { getChannel } from './rabbitmq';

export const consumeMessages = async (queue: string, callback: (msg: string) => void) => {
    const channel = getChannel();
    await channel.assertQueue(queue, { durable: true });
    channel.consume(queue, (msg) => {
        if (msg) {
            const messageContent = msg.content.toString();
            callback(messageContent);
            channel.ack(msg); // Acknowledge message processing
        }
    });
};
