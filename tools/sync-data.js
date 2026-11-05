#!/usr/bin/env node
/* tools/sync-data.js — به‌روزرسانی خودکار data/chN.js
   • count : تعداد سؤال‌ها، از روی chapters/js/questions-chapterN.js
   • ready : درس‌های آماده، از روی فایل‌های courses/lessons/chN/<id>.js (به ترتیب مهارت‌های فصل)
   اجرا (از پوشهٔ اصلی پروژه):  node tools/sync-data.js */
const fs = require('fs'), path = require('path'), root = path.join(__dirname, '..');
for (let n = 1; n <= 7; n++) {
  const dataPath = path.join(root, 'data', 'ch' + n + '.js'), qPath = path.join(root, 'chapters/js/questions-chapter' + n + '.js');
  if (!fs.existsSync(dataPath)) { continue; }
  global.window = {}; eval(fs.readFileSync(dataPath, 'utf8'));
  const order = Object.keys(window.CH[n].skills);
  const count = fs.existsSync(qPath) ? (global.window = {}, (0, eval)(fs.readFileSync(qPath, 'utf8')), window.QUESTIONS.length) : 0;
  const dir = path.join(root, 'courses/lessons/ch' + n);
  const have = fs.existsSync(dir) ? fs.readdirSync(dir).filter(f => /\.js$/.test(f)).map(f => f.slice(0, -3)) : [];
  const ready = order.filter(id => have.includes(id));
  let t = fs.readFileSync(dataPath, 'utf8');
  t = t.replace(/"count": \d+/, '"count": ' + count).replace(/"ready": \[[^\]]*\]/, '"ready": ' + JSON.stringify(ready));
  fs.writeFileSync(dataPath, t);
  console.log('ch' + n + ': count=' + count + '  ready=[' + ready.join(',') + ']');
}
