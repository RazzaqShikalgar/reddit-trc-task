// services/subreddits-service/src/model/subreddit.ts
export interface Subreddit {
    id: number;              // Serial ID
    name: string;           // Subreddit name
    createdAt: Date;        // Creation timestamp
    updatedAt: Date;        // Update timestamp
    creatorId: string;      // Creator's user ID
}
