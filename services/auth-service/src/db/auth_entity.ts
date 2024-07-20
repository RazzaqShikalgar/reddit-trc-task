// services/auth-service/src/db/auth_entity.ts

import { drizzle } from 'drizzle-orm/postgres-js';
import { eq } from 'drizzle-orm';
import postgres from 'postgres';
import dotenv from 'dotenv';
import { users } from '../../../../drizzle/schema.users'; // Adjust the import based on your path
import { User } from '../models/User';
import { v4 as uuidv4 } from 'uuid';

dotenv.config({ path: ".env" });

const queryClient = postgres(process.env.DATABASE_URL || "postgres://postgres:admin@localhost:5432/reddit");
const db = drizzle(queryClient);

export const findUserByEmail = async (email: string): Promise<User | null> => {
    const result = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .execute();
    return result[0] || null;
};

export const findUserById = async (id: string): Promise<User | null> => {
    const result = await db
        .select()
        .from(users)
        .where(eq(users.id, id))
        .execute();
    return result[0] || null;
};

export const createUser = async (userData: User): Promise<User> => {
    const userToInsert = {
        id: userData.id,
        name: userData.name || '',
        email: userData.email,
        password: userData.password || null,
        emailVerified: userData.emailVerified || null,
        image: userData.image || null,
        username: userData.username || '',
    };

    await db.insert(users).values(userToInsert).execute();
    return userData;
};

export const registerUser = async (name: string, email: string, password: string, username: string): Promise<User> => {
    const newUser: User = {
        id: uuidv4(),
        name,
        email,
        password,
        emailVerified: null,
        image: null,
        username,
    };

    await createUser(newUser);
    return newUser;
};
