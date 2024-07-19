// services/rabbitmq/publisher.ts
import { getChannel } from './rabbitmq';

export const publishMessage = async (queue: string, message: string) => {
    const channel = getChannel();
    await channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(message));
    console.log(`Message sent to queue ${queue}: ${message}`);
};
