// services/auth-service/src/db.entity.ts
import { drizzle } from 'drizzle-orm/postgres-js'; // Import Drizzle ORM
import { eq } from 'drizzle-orm'; // Import equality operator
import postgres from 'postgres'; // PostgreSQL client
import dotenv from 'dotenv'; // Load environment variables
import { users } from '../../drizzle/schema.users'; // Adjust the import based on your path
import { User } from '../auth-service/src/models/User'; // Adjust the import based on your project structure
import { hash, compare } from 'bcryptjs'; // For password hashing
import { v4 as uuidv4 } from 'uuid'; // For generating UUIDs

dotenv.config({ path: ".env" });

const queryClient = postgres(process.env.DATABASE_URL || "postgres://postgres:admin@localhost:5432/reddit");
const db = drizzle(queryClient);

// Function to find a user by email
export const findUserByEmail = async (email: string): Promise<User | null> => {
    const result = await db
        .select()
        .from(users)
        .where(eq(users.email, email)) // Use eq() for comparison
        .execute();
    return result[0] || null; // Return the first matching user or null
};

// Function to create a new user
export const createUser = async (userData: User): Promise<User> => {
    const userToInsert = {
        id: userData.id,
        name: userData.name || '', // Set a default empty string if name is null
        email: userData.email,
        password: userData.password || null, // Set a default null if password is null
        emailVerified: userData.emailVerified || null,
        image: userData.image || null,
        username: userData.username || '', // Set a default empty string if username is null
    } as User & { name: string };

    await db.insert(users).values(userToInsert).execute(); // Insert the new user
    return userData; // Return the created user
};

// Function to find a user by user ID
export const findUserById = async (id: string): Promise<User | null> => {
    const result = await db
        .select()
        .from(users)
        .where(eq(users.id, id)) // Use eq() for comparison
        .execute();
    return result[0] || null; // Return the first matching user or null
};

// Register a new user
export const registerUser = async (name: string, email: string, password: string, username: string): Promise<User> => {
    const hashedPassword = await hash(password, 10);
    const newUser: User = {
        id: uuidv4(),
        name,
        email,
        password: hashedPassword,
        emailVerified: null, // Initially, email is not verified
        image: null, // Optional field
        username // Include username
    };

    // Save the new user to the database
    await createUser(newUser);
    return newUser; // Return the created user
};

// Validate a user
export const validateUser = async (email: string, password: string): Promise<User | null> => {
    const user = await findUserByEmail(email); // Find user by email
    if (user) {
        const passwordMatch = await compare(password, user.password ? user.password : ''); // Compare passwords
        if (passwordMatch) {
            return user; // Return user details without password
        }
    }
    return null; // User not found or password mismatch
};

// Find or create a Google account
export const findOrCreateGoogleAccount = async (profile: any): Promise<User> => {
    const { id, emails, displayName } = profile;
    const email = emails[0].value;

    // Find user by email
    let user = await findUserByEmail(email);
    if (!user) {
        // Create a new user if not found
        user = {
            id: uuidv4(),
            name: displayName,
            email: email,
            password: null, // Google account has no password
            emailVerified: new Date(), // Set email verified date to current date
            image: null, // Optional field
            username: email.split('@')[0], // Use email prefix as username
        };

        // Save the new user to the database
        await createUser(user); // Ensure createUser is properly defined to return a User
    }

    return user; // Return the user
};
