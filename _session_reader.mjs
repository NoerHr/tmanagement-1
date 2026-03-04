
import fs from 'fs';
import path from 'path';
import os from 'os';

const base = path.join(os.homedir(), '.claude/projects/C--Users-Advan-OneDrive--------Absen-TWM-TaskMnsgement');
const files = fs.readdirSync(base)
  .filter(f => f.endsWith('.jsonl'))
  .map(f => ({
    name: f,
    full: path.join(base, f),
    mtime: fs.statSync(path.join(base, f)).mtime
  }))
  .sort((a, b) => b.mtime - a.mtime);

for (const file of files) {
  const dt = file.mtime.toISOString().slice(0, 16).replace('T', ' ');
  const id = file.name.replace('.jsonl', '').slice(0, 12);
  let firstMsg = '';
  try {
    const data = fs.readFileSync(file.full, 'utf8');
    const lines = data.split('\n');
    for (const line of lines) {
      if (!line.trim()) continue;
      try {
        const obj = JSON.parse(line);
        if (obj.type === 'human') {
          const content = obj.message?.content;
          if (Array.isArray(content)) {
            for (const c of content) {
              if (c.type === 'text' && c.text && c.text.length > 3 && !c.text.startsWith('[Request')) {
                firstMsg = c.text.slice(0, 150).replace(/\n/g, ' ');
                break;
              }
            }
          }
          if (firstMsg) break;
        }
      } catch (e) {}
    }
  } catch (e) {}
  console.log(`${dt} | ${id}... | ${firstMsg}`);
}
