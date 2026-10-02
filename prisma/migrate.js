import { spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to parse .env file
function getEnvVar(name) {
  if (process.env[name]) {
    return process.env[name];
  }
  try {
    const envPath = path.join(__dirname, '../.env');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      const lines = content.split('\n');
      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
          const parts = trimmed.split('=');
          if (parts[0].trim() === name) {
            let val = parts.slice(1).join('=').trim();
            if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
              val = val.substring(1, val.length - 1);
            }
            return val;
          }
        }
      }
    }
  } catch (e) {
    console.error('Error reading .env file:', e);
  }
  return null;
}

function main() {
  // 1. Run prepare script first to ensure schema.prisma is generated/selected
  const preparePath = path.join(__dirname, 'prepare.js');
  console.log(`[db:migrate] Running schema preparation...`);
  const prepResult = spawnSync('node', [preparePath], { stdio: 'inherit' });
  if (prepResult.status !== 0) {
    process.exit(prepResult.status || 1);
  }

  // 2. Determine provider and run migration
  const provider = getEnvVar('SQL_PROVIDER') || 'sqlite';
  let args = [];
  if (provider === 'sqlite') {
    // For SQLite local development: use migrate dev
    args = ['migrate', 'dev', ...process.argv.slice(2)];
  } else if (provider === 'mysql') {
    // For MySQL production/Azure: use migrate deploy
    args = ['migrate', 'deploy', ...process.argv.slice(2)];
  } else {
    console.error(`Error: Unsupported SQL_PROVIDER: ${provider}`);
    process.exit(1);
  }

  console.log(`[db:migrate] Executing: npx prisma ${args.join(' ')}`);
  const result = spawnSync('npx', ['prisma', ...args], { stdio: 'inherit', shell: true });
  process.exit(result.status || 0);
}

main();
