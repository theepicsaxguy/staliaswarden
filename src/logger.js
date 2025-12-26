import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Setup log file
const logDir = path.join(__dirname, '..', 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}
const logFile = path.join(logDir, `app-${new Date().toISOString().split('T')[0]}.log`);

// Helper function to write to both console and file
export function log(level, message, data = null) {
  const timestamp = new Date().toISOString();
  const logEntry = data 
    ? `[${timestamp}] [${level}] ${message}\n${JSON.stringify(data, null, 2)}\n`
    : `[${timestamp}] [${level}] ${message}\n`;
  
  // Write to console
  console.log(logEntry.trim());
  
  // Write to file (with error handling)
  try {
    fs.appendFileSync(logFile, logEntry, 'utf8');
  } catch (err) {
    // If file write fails, at least log to console
    console.error(`[ERROR] Failed to write to log file ${logFile}: ${err.message}`);
  }
}

export { logFile };

