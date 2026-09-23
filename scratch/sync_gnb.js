const fs = require('fs');
const path = require('path');

const yeobaekPath = path.join(__dirname, '..', 'UIUX_허지민', 'Antigravity', '05.수정', '강사_제작예시_여백.html');
const testPath = path.join(__dirname, '..', 'UIUX_허지민', 'Antigravity', '05.수정', 'hero_test.html');

const yeobaek = fs.readFileSync(yeobaekPath, 'utf8');
let test = fs.readFileSync(testPath, 'utf8');

// 1. Extract exact <header class="top-full">...</header> from yeobaek
const yeobaekHeaderMatch = yeobaek.match(/<header class="top-full">[\s\S]*?<\/header>/);
if (!yeobaekHeaderMatch) {
  console.error('Failed to find header in yeobaek');
  process.exit(1);
}
const yeobaekHeader = yeobaekHeaderMatch[0];
console.log('Found yeobaek header length:', yeobaekHeader.length);

// 2. Replace current header in hero_test.html
const testHeaderMatch = test.match(/<header class="top-full">[\s\S]*?<\/header>/);
if (!testHeaderMatch) {
  console.error('Failed to find header in test');
  process.exit(1);
}

test = test.replace(testHeaderMatch[0], yeobaekHeader);
console.log('Replaced header markup in hero_test.html');

// 3. In the custom CSS in hero_test.html, remove header override styles that changed top-full, brand-group, nav-wide, etc.
// Let's check what custom CSS was added for header in hero_test.html:
// .top-full, .nav-wide, .header-left-col, .winner-prize-*, .header-quick-menu, .brand-group, .links-wide, .header-lang-toggle, .gnb-actions-wrap, .btn-gnb
// We should replace those with the EXACT header CSS from yeobaek:

const yeobaekGnbCss = `
/* GNB Styles Exactly Synced from 강사_제작예시_여백.html */
.top-full {
  position: sticky !important;
  top: 0 !important;
  background: rgba(255, 255, 255, 0.96) !important;
  backdrop-filter: blur(12px) !important;
  -webkit-backdrop-filter: blur(12px) !important;
  border-bottom: 1px solid #eaecdf !important;
  padding: 0 32px !important;
  z-index: 1000 !important;
}
.nav-wide {
  min-height: 70px !important;
  gap: 22px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  width: 100% !important;
}
.brand-group {
  position: relative !important;
  display: inline-flex !important;
  align-items: center !important;
  text-decoration: none !important;
  transform: none !important;
  left: auto !important;
}
.brand-group strong {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important;
  font-size: 34px !important;
  color: #919c00 !important;
  letter-spacing: -0.04em !important;
  font-weight: 600 !important;
  line-height: 1 !important;
}
.brand-group:after {
  display: none !important;
}
.header-right-nav-group {
  display: flex !important;
  align-items: center !important;
  gap: 26px !important;
}
.links-wide {
  display: flex !important;
  align-items: center !important;
  gap: 25px !important;
}
.links-wide a {
  font-size: 12px !important;
  font-weight: 400 !important;
  color: #373d30 !important;
  text-decoration: none !important;
  padding: 6px 0 !important;
  position: relative !important;
}
.links-wide a:after {
  content: '' !important;
  position: absolute !important;
  bottom: -2px !important;
  left: 0 !important;
  width: 0 !important;
  height: 1px !important;
  background: #a0ac00 !important;
  transition: width 0.3s ease !important;
}
.links-wide a:hover:after,
.links-wide a.active:after {
  width: 100% !important;
}
.links-wide a.active {
  font-weight: 700 !important;
  color: #252923 !important;
}
.gnb-actions-wrap {
  display: flex !important;
  align-items: center !important;
  gap: 12px !important;
}
.gnb-search-wrap {
  display: inline-flex !important;
  align-items: center !important;
  gap: 6px !important;
  padding: 4px 2px !important;
  border-bottom: 1.5px solid #D1D5DB !important;
  transition: border-color 0.3s ease !important;
}
.gnb-search-wrap:focus-within {
  border-bottom: 2px solid #252923 !important;
}
.gnb-search-input {
  width: 65px !important;
  background: transparent !important;
  border: none !important;
  outline: none !important;
  color: #252923 !important;
  font-size: 0.82rem !important;
  font-family: inherit !important;
  transition: width 0.3s ease !important;
}
.gnb-search-input:focus,
.gnb-search-input:focus-visible {
  width: 85px !important;
  outline: none !important;
}
.search-link {
  display: flex !important;
  align-items: center !important;
  color: #252923 !important;
  opacity: 0.75 !important;
}
.gnb-consult-btn {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  background: transparent !important;
  border: none !important;
  color: #252923 !important;
  opacity: 0.80 !important;
  cursor: pointer !important;
  padding: 4px !important;
}
.btn-gnb {
  font-size: 12px !important;
  padding: 10px 15px !important;
  border-radius: 999px !important;
  background: #c5d200 !important;
  color: #252923 !important;
  border: 1px solid #c5d200 !important;
  font-weight: 600 !important;
  text-decoration: none !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  transition: all 0.2s ease !important;
}
.btn-gnb:hover {
  background: #d7e43a !important;
  border-color: #d7e43a !important;
  color: #252923 !important;
}
`;

// Replace the old header css chunk in the custom section
const customCssRegex = /\/\* Redesigned Floating Header[\s\S]*?\/\* ===+[\s\n]+HERO MAIN SECTION REDESIGN/;
if (customCssRegex.test(test)) {
  test = test.replace(customCssRegex, `${yeobaekGnbCss}\n/* ==========================================================================\n   HERO MAIN SECTION REDESIGN`);
  console.log('Replaced custom header CSS with exact yeobaek GNB CSS');
} else {
  console.log('Could not match customCssRegex, appending yeobaekGnbCss');
  test = test.replace('</style>', `${yeobaekGnbCss}\n</style>`);
}

fs.writeFileSync(testPath, test, 'utf8');
console.log('Successfully synced GNB from 강사_제작예시_여백.html to hero_test.html');
