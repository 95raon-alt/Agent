const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, '..', 'UIUX_허지민', 'Antigravity', '05.수정', '강사_제작예시.html');
const dstPath = path.join(__dirname, '..', 'UIUX_허지민', 'Antigravity', '05.수정', 'hero_test.html');

console.log('Reading from:', srcPath);
const content = fs.readFileSync(srcPath, 'utf8');
const lines = content.split(/\r?\n/);

console.log('Total lines:', lines.length);

// Find head up to <body>: lines 0 to 2439 (1-indexed: 1 to 2440)
const headLines = lines.slice(0, 2440);

// Find header and hero: lines 2441 to 2562 (1-indexed: 2442 to 2562)
const heroLines = lines.slice(2441, 2562);

const output = [
  ...headLines,
  ...heroLines,
  '  </main>',
  '</body>',
  '</html>'
].join('\n');

fs.writeFileSync(dstPath, output, 'utf8');
console.log('Successfully wrote', output.split('\n').length, 'lines to', dstPath);
