// services/subscriptions-service/src/models/subscription.ts

export interface Subscription {
    userId: string;
    subredditId: number;
}

export interface NewSubscription {
    userId: string;
    subredditId: number;
}
