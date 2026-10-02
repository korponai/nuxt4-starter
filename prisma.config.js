import { defineConfig } from 'prisma/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env file into process.env if not already set
try {
  const envPath = path.join(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    const lines = content.split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const parts = trimmed.split('=');
        const name = parts[0].trim();
        if (name && !process.env[name]) {
          let val = parts.slice(1).join('=').trim();
          if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
            val = val.substring(1, val.length - 1);
          }
          process.env[name] = val;
        }
      }
    }
  }
} catch (e) {}

const provider = process.env.SQL_PROVIDER || 'sqlite';

export default defineConfig({
  schema: './prisma/schema.prisma',
  migrations: {
    path: `./prisma/migrations/${provider}`,
    seed: 'tsx prisma/seed.ts',
  },
});
