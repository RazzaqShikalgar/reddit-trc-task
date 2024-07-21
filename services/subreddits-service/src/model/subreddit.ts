// services/subreddits-service/src/model/subreddit.ts
export interface Subreddit {
    id?: number;              // Serial ID
    name: string;           // Subreddit name
    createdAt: Date | null;        // Creation timestamp
    updatedAt: Date | null;        // Update timestamp
    creatorId: string | null;      // Creator's user ID
}
