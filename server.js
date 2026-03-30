import { createServer } from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import Database from 'better-sqlite3';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const DIST = join(__dirname, 'dist');
const PORT = process.env.PORT || 3000;
const ADMIN_KEY = process.env.ADMIN_KEY || '';
const DATA_DIR = process.env.DATA_DIR || join(__dirname, 'data');

// Ensure data directory exists
mkdirSync(DATA_DIR, { recursive: true });

// Init SQLite
const db = new Database(join(DATA_DIR, 'signups.db'));
db.pragma('journal_mode = WAL');
db.exec(`
  CREATE TABLE IF NOT EXISTS signups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    created_at TEXT DEFAULT (datetime('now'))
  )
`);

const insertEmail = db.prepare('INSERT OR IGNORE INTO signups (email) VALUES (?)');
const getAllSignups = db.prepare('SELECT email, created_at FROM signups ORDER BY created_at DESC');

const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

function json(res, status, data) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

function readBody(req) {
  return new Promise((resolve) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => resolve(Buffer.concat(chunks).toString()));
  });
}

createServer(async (req, res) => {
  // CORS for API routes
  if (req.url?.startsWith('/api/')) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }
  }

  // POST /api/signup
  if (req.url === '/api/signup' && req.method === 'POST') {
    try {
      const body = JSON.parse(await readBody(req));
      const email = (body.email || '').trim().toLowerCase();
      if (!email || !email.includes('@')) {
        return json(res, 400, { error: 'Valid email required' });
      }
      insertEmail.run(email);
      console.log(`signup: ${email}`);
      return json(res, 200, { ok: true });
    } catch {
      return json(res, 400, { error: 'Invalid request' });
    }
  }

  // GET /api/signups (protected)
  if (req.url === '/api/signups' && req.method === 'GET') {
    if (!ADMIN_KEY) return json(res, 403, { error: 'ADMIN_KEY not configured' });
    const auth = req.headers.authorization?.replace('Bearer ', '');
    if (auth !== ADMIN_KEY) return json(res, 401, { error: 'Unauthorized' });
    return json(res, 200, { signups: getAllSignups.all() });
  }

  // Static files
  let filePath = join(DIST, req.url === '/' ? 'index.html' : req.url);

  if (!existsSync(filePath)) {
    filePath = join(DIST, 'index.html'); // SPA fallback
  }

  try {
    const content = readFileSync(filePath);
    const ext = extname(filePath);
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(content);
  } catch {
    res.writeHead(404);
    res.end('Not found');
  }
}).listen(PORT, () => {
  console.log(`par72 serving on :${PORT}`);
});
