// services/subreddits-service/src/services/subredditService.ts
import { createSubreddit, getAllSubreddits, findSubredditById } from '../db/entity'; // Import DB functions
import { Subreddit } from '../model/subreddit'; // Import the Subreddit interface
import { publishMessage } from '../../../rabbitmq/publisher';
export class SubredditService {
    async createSubreddit(creatorId: string, name: string): Promise<Subreddit> {
        const newSubreddit: Subreddit = {
            id: 0, // This will be auto-generated
            name,
            createdAt: new Date(),
            updatedAt: new Date(),
            creatorId,
        };

        await createSubreddit(newSubreddit);
        await publishMessage('subreddit_created', JSON.stringify(newSubreddit)); // Publish message to RabbitMQ
        return newSubreddit; // Return the created subreddit
    }

    async getAllSubreddits(): Promise<Subreddit[]> {
        return await getAllSubreddits(); // Fetch all subreddits
    }
}
