import "dotenv/config"
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

const migrationClient = postgres("postgres://postgres:admin@localhost:5432/reddit", { max: 1 });
async function main() {
    await migrate(drizzle(migrationClient), {
        migrationsFolder: "drizzle/migrations",
    })
    await migrationClient.end()
}
main()