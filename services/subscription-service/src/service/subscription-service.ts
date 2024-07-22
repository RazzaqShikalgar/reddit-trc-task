// services/subscriptions-service/src/services/subscriptionService.ts

import { createSubscription, findSubscriptionsByUserId, deleteSubscription } from '../db/entity';

export class SubscriptionService {
    async create(userId: string, subredditId: number) {
        await createSubscription(userId, subredditId);
    }

    async getByUserId(userId: string) {
        return await findSubscriptionsByUserId(userId);
    }

    async remove(userId: string, subredditId: number) {
        await deleteSubscription(userId, subredditId);
    }
}
