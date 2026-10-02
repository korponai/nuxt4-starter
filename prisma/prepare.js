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
  const provider = getEnvVar('SQL_PROVIDER') || 'sqlite';
  console.log(`[db:prepare] Active SQL provider is: ${provider}`);

  const baseSqlitePath = path.join(__dirname, 'schema.sqlite.base.prisma');
  const baseMysqlPath = path.join(__dirname, 'schema.mysql.base.prisma');
  const modelsPath = path.join(__dirname, 'schema.models.prisma');

  const outSqlitePath = path.join(__dirname, 'schema.sqlite.prisma');
  const outMysqlPath = path.join(__dirname, 'schema.mysql.prisma');
  const outActivePath = path.join(__dirname, 'schema.prisma');

  if (!fs.existsSync(modelsPath)) {
    console.error(`Error: Models file not found at ${modelsPath}`);
    process.exit(1);
  }
  if (!fs.existsSync(baseSqlitePath)) {
    console.error(`Error: Base SQLite schema not found at ${baseSqlitePath}`);
    process.exit(1);
  }
  if (!fs.existsSync(baseMysqlPath)) {
    console.error(`Error: Base MySQL schema not found at ${baseMysqlPath}`);
    process.exit(1);
  }

  const modelsContent = fs.readFileSync(modelsPath, 'utf8');
  const sqliteBaseContent = fs.readFileSync(baseSqlitePath, 'utf8');
  const mysqlBaseContent = fs.readFileSync(baseMysqlPath, 'utf8');

  // Generate individual provider schemas
  // Strip MySQL-specific native database type annotations (e.g. @db.Text) because SQLite does not support them
  const sqliteSchema = `${sqliteBaseContent}\n${modelsContent}`.replace(/@db\.[a-zA-Z0-9_]+(?:\([^)]*\))?/g, '');
  const mysqlSchema = `${mysqlBaseContent}\n${modelsContent}`;

  fs.writeFileSync(outSqlitePath, sqliteSchema, 'utf8');
  console.log(`[db:prepare] Generated ${outSqlitePath}`);

  fs.writeFileSync(outMysqlPath, mysqlSchema, 'utf8');
  console.log(`[db:prepare] Generated ${outMysqlPath}`);

  // Copy selected one to active schema.prisma, removing custom output directory
  let activeSchemaContent = provider === 'sqlite' ? sqliteSchema : mysqlSchema;
  activeSchemaContent = activeSchemaContent.replace(/output\s*=\s*["'][^"']+["']/g, '');

  if (provider === 'sqlite') {
    fs.writeFileSync(outActivePath, activeSchemaContent, 'utf8');
    console.log(`[db:prepare] Set active schema to SQLite`);
  } else if (provider === 'mysql') {
    fs.writeFileSync(outActivePath, activeSchemaContent, 'utf8');
    console.log(`[db:prepare] Set active schema to MySQL`);
  } else {
    console.error(`Error: Unsupported SQL_PROVIDER: ${provider}`);
    process.exit(1);
  }
}

main();
