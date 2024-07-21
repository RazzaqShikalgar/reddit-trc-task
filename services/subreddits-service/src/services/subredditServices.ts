// services/subreddits-service/src/services/subredditService.ts
import { createSubreddit, getAllSubreddits, findSubredditById } from '../db/entity'; // Import DB functions
import { Subreddit } from '../model/subreddit'; // Import the Subreddit interface
import { sendMessage } from '../../../rabbitmq/producer';
export class SubredditService {
    async createSubreddit(creatorId: string, name: string): Promise<Subreddit> {
        const newSubreddit: Subreddit = {
            name,
            createdAt: new Date(),
            updatedAt: new Date(),
            creatorId,
        };

        await createSubreddit(newSubreddit);
        // await sendMessage('subreddit_created', JSON.stringify(newSubreddit)); // Publish message to RabbitMQ
        return newSubreddit; // Return the created subreddit
    }

    async getAllSubreddits(): Promise<Subreddit[]> {
        return await getAllSubreddits(); // Fetch all subreddits
    }
}
