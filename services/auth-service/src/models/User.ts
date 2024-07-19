// services/auth-service/src/model/User.ts
export interface User {
  id: string;                 // UUID
  name: string;               // User's name
  email: string;              // User's email
  emailVerified?: Date | null; // Date when the email was verified (nullable)
  image?: string | null;      // URL to the user's image (optional)
  username: string;           // Unique username
  password: string | null;
}

