const fs = require('fs');
const html = fs.readFileSync('UIUX_허지민/Antigravity/05.수정/hero_test.html', 'utf8');
console.log('File size:', html.length, 'bytes');
console.log('Has #hero:', html.includes('id="hero"'));
console.log('Has WINNER PRIZE:', html.includes('WINNER'));
console.log('Has High End Wellness:', html.includes('High End Wellness'));
console.log('Has SCROLL DOWN:', html.includes('SCROLL'));
