const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'UIUX_허지민', 'Antigravity', '05.수정', 'hero_test.html');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Google Font import for luxury serif typography (Playfair Display / Plus Jakarta Sans / Pretendard)
const fontImport = `
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,400;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
`;

// 2. New CSS Styles dedicated to the Luxury Editorial Hero & Header
const newStyles = `
/* ==========================================================================
   LUXURY EDITORIAL HERO & HEADER SYSTEM (Referenced from image.png & copies)
   - Neutral Warm Palette (#FAF8F5, #F3EFEA, #E8E2D9, #1A1C19)
   - Left Hanging Winner Prize Badge & Quick Menu
   - High-End Serif Typography & Grand Headlines
   - Architectural Sunlight/Dune Visual Framing
   - Circle Slider Controls, Progress Indicator & Scroll Down Badge
   ========================================================================== */

:root {
  --afit-luxury-bg: #F5F2EB;
  --afit-luxury-surface: #FFFFFF;
  --afit-luxury-sand: #ECE7DE;
  --afit-luxury-sand-dark: #D8D1C3;
  --afit-luxury-gold: #B89B6C;
  --afit-luxury-dark: #191C1A;
  --afit-luxury-charcoal: #2A2E2B;
  --afit-luxury-muted: #6B726B;
  --afit-luxury-accent: #2D3A29;
}

/* Announcement Top Bar (image copy.png reference) */
.hero-top-announcement {
  background: #111412;
  color: #E2E6DF;
  font-size: 12px;
  letter-spacing: 0.02em;
  padding: 8px 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1002;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}
.hero-top-announcement .badge-news {
  background: var(--afit-luxury-gold);
  color: #111412;
  font-weight: 800;
  font-size: 10px;
  padding: 2px 7px;
  border-radius: 4px;
  margin-right: 12px;
  letter-spacing: 0.05em;
}
.hero-top-announcement-text {
  opacity: 0.92;
  font-weight: 500;
}
.hero-top-announcement-close {
  position: absolute;
  right: 24px;
  background: none;
  border: none;
  color: #8C948B;
  font-size: 16px;
  cursor: pointer;
  line-height: 1;
  padding: 4px;
  transition: color 0.2s;
}
.hero-top-announcement-close:hover {
  color: #FFF;
}

/* Redesigned Floating Header (image.png & image copy 2.png reference) */
.top-full {
  background: rgba(245, 242, 235, 0.92) !important;
  backdrop-filter: blur(16px) !important;
  -webkit-backdrop-filter: blur(16px) !important;
  border-bottom: 1px solid rgba(216, 209, 195, 0.6) !important;
  padding: 0 40px !important;
  position: sticky !important;
  top: 0 !important;
  z-index: 1000 !important;
}
.nav-wide {
  min-height: 80px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  position: relative !important;
}

/* Header Left: Winner Prize Badge + Quick Menu */
.header-left-col {
  display: flex;
  align-items: center;
  gap: 20px;
  position: relative;
  z-index: 2;
}

/* WINNER PRIZE Badge (Exact replica of image.png / image copy.png) */
.winner-prize-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #111412;
  color: #FFF;
  width: 58px;
  height: 68px;
  border-radius: 0 0 6px 6px;
  box-shadow: 0 4px 14px rgba(0,0,0,0.18);
  text-decoration: none;
  padding: 6px 4px 8px;
  box-sizing: border-box;
  transition: transform 0.2s ease;
  flex-shrink: 0;
}
.winner-prize-badge:hover {
  transform: translateY(2px);
}
.winner-prize-icon {
  width: 24px;
  height: 24px;
  margin-bottom: 3px;
}
.winner-prize-text {
  font-size: 7px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-align: center;
  line-height: 1.15;
  color: #E2E6DF;
}
.winner-prize-sub {
  font-size: 6px;
  letter-spacing: 0.08em;
  color: var(--afit-luxury-gold);
  margin-top: 1px;
}

/* Quick Category Floating Pill Menu (image.png reference) */
.header-quick-menu {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(216, 209, 195, 0.8);
  border-radius: 999px;
  padding: 4px 6px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.03);
}
.header-quick-menu a {
  text-decoration: none;
  font-size: 11.5px;
  color: #4A5047;
  font-weight: 600;
  padding: 5px 12px;
  border-radius: 999px;
  transition: all 0.2s ease;
  white-space: nowrap;
}
.header-quick-menu a:hover,
.header-quick-menu a.active {
  background: #191C1A;
  color: #FFFFFF;
}

/* Center Brand Wordmark (image.png reference) */
.brand-group {
  position: absolute !important;
  left: 50% !important;
  transform: translateX(-50%) !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  text-decoration: none !important;
  gap: 2px !important;
}
.brand-group strong {
  font-family: 'Plus Jakarta Sans', sans-serif !important;
  font-size: 26px !important;
  font-weight: 900 !important;
  letter-spacing: 0.08em !important;
  color: #191C1A !important;
  line-height: 1 !important;
}
.brand-group:after {
  content: '1:1 맞춤 웰니스' !important;
  font-family: inherit !important;
  font-size: 10px !important;
  letter-spacing: 0.12em !important;
  color: #6B726B !important;
  position: static !important;
  margin-top: 2px !important;
  font-weight: 600 !important;
}

/* Right Nav + Actions */
.header-right-nav-group {
  display: flex !important;
  align-items: center !important;
  gap: 24px !important;
}
.links-wide {
  display: flex !important;
  align-items: center !important;
  gap: 20px !important;
}
.links-wide a {
  font-size: 13px !important;
  font-weight: 600 !important;
  color: #4A5047 !important;
  text-decoration: none !important;
  transition: color 0.2s !important;
}
.links-wide a:hover {
  color: #191C1A !important;
}
.header-lang-toggle {
  font-size: 12px;
  font-weight: 700;
  color: #8C948B;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  user-select: none;
}
.header-lang-toggle span.active {
  color: #191C1A;
}
.gnb-actions-wrap {
  display: flex !important;
  align-items: center !important;
  gap: 14px !important;
}
.btn-gnb {
  background: #191C1A !important;
  color: #FFF !important;
  border-radius: 999px !important;
  padding: 9px 20px !important;
  font-size: 12.5px !important;
  font-weight: 700 !important;
  border: 1px solid #191C1A !important;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1) !important;
  transition: all 0.2s ease !important;
}
.btn-gnb:hover {
  background: #343B33 !important;
  border-color: #343B33 !important;
  transform: translateY(-1px) !important;
}

/* ==========================================================================
   HERO MAIN SECTION REDESIGN
   ========================================================================== */
#hero {
  background: #F5F2EB !important;
  min-height: 880px !important;
  padding: 40px 0 80px !important;
  position: relative !important;
  overflow: hidden !important;
}

/* Background Atmospheric Architectural Stage (image.png reference) */
.luxury-hero-stage-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
}

/* Soft Sunlight Halo in the Horizon */
.luxury-sunlight {
  position: absolute;
  top: 15%;
  right: 28%;
  width: 320px;
  height: 320px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 248, 220, 0.9) 0%, rgba(255, 230, 180, 0.45) 40%, rgba(245, 242, 235, 0) 75%);
  filter: blur(28px);
  animation: sunlightPulse 8s ease-in-out infinite alternate;
}
@keyframes sunlightPulse {
  0% { transform: scale(0.95); opacity: 0.85; }
  100% { transform: scale(1.08); opacity: 1; }
}

/* Architectural Portal Frame (inspired by image.png window/door opening) */
.luxury-arch-frame {
  position: absolute;
  top: 40px;
  right: 5%;
  width: 58%;
  height: 92%;
  border-radius: 36px 36px 0 0;
  background: linear-gradient(175deg, #FFFFFF 0%, #F8F5EE 45%, #EBE5D8 100%);
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: 
    inset 0 2px 20px rgba(255,255,255,0.9),
    0 24px 60px rgba(45, 41, 35, 0.08),
    0 1px 3px rgba(0,0,0,0.04);
  z-index: 1;
  overflow: hidden;
}
.luxury-arch-frame::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40%;
  background: linear-gradient(to top, rgba(235, 229, 216, 0.8), transparent);
}

/* Faint Stamp / Watermark Graphic (image.png bottom right reference) */
.luxury-seal-stamp {
  position: absolute;
  right: 48px;
  bottom: 48px;
  width: 140px;
  height: 140px;
  border: 1.5px dashed rgba(160, 150, 135, 0.4);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  pointer-events: none;
  z-index: 6;
  opacity: 0.65;
  animation: rotateStamp 40s linear infinite;
}
@keyframes rotateStamp {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.luxury-seal-text {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 8px;
  font-weight: 700;
  letter-spacing: 0.16em;
  color: #7A7265;
  text-transform: uppercase;
  width: 110px;
  line-height: 1.4;
}

/* Floating Circular SCROLL DOWN Button (image copy 2.png reference) */
.hero-scroll-badge {
  position: absolute;
  right: 64px;
  bottom: 50px;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #3B462C;
  color: #FFF;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  box-shadow: 0 8px 24px rgba(59, 70, 44, 0.28);
  z-index: 10;
  transition: transform 0.25s ease, background 0.25s ease;
}
.hero-scroll-badge:hover {
  transform: translateY(4px) scale(1.05);
  background: #252D1C;
}
.hero-scroll-badge span {
  font-size: 7px;
  font-weight: 800;
  letter-spacing: 0.14em;
  line-height: 1.2;
}
.hero-scroll-badge svg {
  margin-top: 3px;
  transition: transform 0.25s ease;
}
.hero-scroll-badge:hover svg {
  transform: translateY(2px);
}

/* Main Hero Two-Column Grid */
.hero-editorial-wrap {
  position: relative;
  z-index: 5;
  max-width: 1400px;
  margin: 0 auto;
  padding: 30px 48px 20px;
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 50px;
  align-items: center;
  min-height: 720px;
}

/* Left Content Column */
.hero-copy-col {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-right: 20px;
  z-index: 5;
}

/* Series / Pagination Indicator (image copy.png reference: • 01 Nutrition care Pet Food) */
.hero-series-indicator {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 22px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.18em;
  color: #5C6356;
  text-transform: uppercase;
}
.hero-series-indicator .bullet {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #3B462C;
}
.hero-series-indicator .line {
  width: 38px;
  height: 1.5px;
  background: rgba(92, 99, 86, 0.4);
}

/* Luxury Serif Catchphrase (image.png reference: High End Beauty, Be modern, Mi modern) */
.hero-serif-headline {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(34px, 3.8vw, 56px);
  font-style: italic;
  font-weight: 500;
  line-height: 1.12;
  letter-spacing: -0.01em;
  color: #2D3328;
  margin: 0 0 14px;
}

/* Grand Korean Headline */
.hero-main-headline {
  font-family: 'Plus Jakarta Sans', 'Pretendard', sans-serif;
  font-size: clamp(32px, 3.4vw, 52px);
  font-weight: 900;
  line-height: 1.25;
  letter-spacing: -0.035em;
  color: #191C1A;
  margin: 0 0 20px;
}

/* Lead Description */
.hero-lead-desc {
  font-size: 15px;
  line-height: 1.85;
  color: #52594D;
  max-width: 530px;
  margin: 0 0 32px;
  word-break: keep-all;
}

/* 3 Core Value Metric Pills (Refined into sleek minimal horizontal row) */
.hero-metrics-bar {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  background: rgba(255, 255, 255, 0.75);
  border: 1px solid rgba(216, 209, 195, 0.7);
  border-radius: 16px;
  padding: 16px 20px;
  margin-bottom: 34px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.02);
}
.hero-metric-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-right: 1px solid rgba(216, 209, 195, 0.6);
  padding-right: 12px;
}
.hero-metric-item:last-child {
  border-right: none;
  padding-right: 0;
}
.hero-metric-num {
  font-size: 11px;
  font-weight: 800;
  color: #B89B6C;
  letter-spacing: 0.1em;
}
.hero-metric-title {
  font-size: 13.5px;
  font-weight: 800;
  color: #191C1A;
}
.hero-metric-sub {
  font-size: 11.5px;
  color: #6C7367;
  line-height: 1.4;
}

/* Hero CTA Button Group (image.png black capsule button reference) */
.hero-action-group {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
  margin-bottom: 36px;
}
.btn-pill-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: #191C1A;
  color: #FFFFFF !important;
  font-size: 14px;
  font-weight: 700;
  padding: 15px 32px;
  border-radius: 999px;
  text-decoration: none;
  border: 1px solid #191C1A;
  box-shadow: 0 8px 24px rgba(25, 28, 26, 0.22);
  transition: all 0.25s ease;
}
.btn-pill-primary:hover {
  background: #3B462C;
  border-color: #3B462C;
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(25, 28, 26, 0.28);
}
.btn-pill-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.85);
  color: #191C1A !important;
  font-size: 14px;
  font-weight: 600;
  padding: 15px 26px;
  border-radius: 999px;
  text-decoration: none;
  border: 1px solid rgba(216, 209, 195, 0.9);
  transition: all 0.25s ease;
}
.btn-pill-secondary:hover {
  background: #FFFFFF;
  border-color: #191C1A;
  transform: translateY(-2px);
}

/* Slider Controls & Progress (image copy 2.png reference: (←) (→) + progress bar) */
.hero-slider-nav-row {
  display: flex;
  align-items: center;
  gap: 20px;
}
.slider-arrows {
  display: flex;
  align-items: center;
  gap: 8px;
}
.slider-arrow-btn {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid rgba(92, 99, 86, 0.3);
  background: rgba(255, 255, 255, 0.6);
  color: #2D3328;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}
.slider-arrow-btn:hover {
  background: #191C1A;
  color: #FFF;
  border-color: #191C1A;
}
.slider-progress-track {
  flex: 1;
  max-width: 260px;
  height: 2px;
  background: rgba(92, 99, 86, 0.2);
  border-radius: 2px;
  position: relative;
  overflow: hidden;
}
.slider-progress-bar {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 33.333%;
  background: #191C1A;
  border-radius: 2px;
}
.slider-current-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #737A6D;
}

/* ==========================================================================
   RIGHT VISUAL CENTERPIECE (3D Studio Dual Bottle Presentation)
   ========================================================================== */
.hero-visual-col {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 600px;
  z-index: 5;
}

/* Pedestal Platform with Ambient Glow & Reflection */
.bottle-pedestal-stage {
  position: relative;
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 3D Bottle Showcase Container */
.showcase-bottle-wrapper {
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: 420px;
  width: 100%;
  margin-bottom: 20px;
}

/* Primary Hero Studio Bottle (Hero Accent Scale) */
.showcase-main-bottle {
  --bottle-width: 185px;
  z-index: 3;
  filter: drop-shadow(0 28px 34px rgba(28, 33, 24, 0.24));
  transition: transform 0.4s ease;
}
.showcase-main-bottle:hover {
  transform: translateY(-8px) scale(1.02);
}

/* Flanking Bottle Collection Lineup (Soft depth-of-field background bottles) */
.flank-bottle {
  position: absolute;
  bottom: 20px;
  opacity: 0.72;
  filter: blur(1.5px) drop-shadow(0 14px 20px rgba(0,0,0,0.14));
  transition: all 0.3s ease;
  cursor: pointer;
}
.flank-bottle:hover {
  opacity: 1;
  filter: none;
  transform: translateY(-6px) scale(1.06);
  z-index: 4;
}
.flank-bottle.left-1 {
  left: 15px;
  --bottle-width: 130px;
  transform: rotate(-10deg);
}
.flank-bottle.right-1 {
  right: 15px;
  --bottle-width: 130px;
  transform: rotate(10deg);
}

/* Floating Spec & Price Pill (Clean & Editorial) */
.hero-product-pill-card {
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(216, 209, 195, 0.85);
  border-radius: 20px;
  padding: 16px 24px;
  box-shadow: 0 12px 36px rgba(0,0,0,0.06);
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 5;
}
.hero-product-pill-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.hero-product-pill-tag {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: #3B462C;
  background: #EBECE1;
  padding: 3px 10px;
  border-radius: 999px;
}
.hero-product-pill-name {
  font-size: 16px;
  font-weight: 800;
  color: #191C1A;
}
.hero-product-pill-desc {
  font-size: 12.5px;
  color: #555B4D;
  line-height: 1.5;
}
.hero-product-pill-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px dashed rgba(216, 209, 195, 0.8);
  padding-top: 8px;
  margin-top: 2px;
}
.hero-product-price {
  font-size: 14.5px;
  font-weight: 800;
  color: #191C1A;
}
.hero-product-price small {
  font-size: 12px;
  color: #7D8577;
  font-weight: 500;
}
.hero-engrave-badge {
  font-size: 11px;
  font-weight: 700;
  color: #3B462C;
  display: flex;
  align-items: center;
  gap: 4px;
}

/* Responsive Breakpoints */
@media (max-width: 1200px) {
  .hero-editorial-wrap {
    grid-template-columns: 1fr;
    gap: 40px;
    padding: 20px 24px;
  }
  .luxury-arch-frame {
    display: none;
  }
  .header-quick-menu {
    display: none;
  }
}
@media (max-width: 768px) {
  .hero-serif-headline {
    font-size: 32px;
  }
  .hero-main-headline {
    font-size: 30px;
  }
  .hero-metrics-bar {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  .hero-metric-item {
    border-right: none;
    border-bottom: 1px solid rgba(216, 209, 195, 0.6);
    padding-bottom: 8px;
  }
  .hero-metric-item:last-child {
    border-bottom: none;
  }
  .hero-action-group {
    flex-direction: column;
    align-items: stretch;
  }
  .hero-scroll-badge, .luxury-seal-stamp {
    display: none;
  }
}
`;

// Insert the new styles right before </style></head>
content = content.replace('</style>\n</head>', `\n${newStyles}\n</style>\n</head>`);
if (!content.includes('luxury-hero-stage-bg')) {
  // If replacement didn't catch due to formatting, insert before </head>
  content = content.replace('</head>', `<style>\n${newStyles}\n</style>\n</head>`);
}

// 3. New HTML markup for Header and Hero Section
const newHeaderAndHeroMarkup = `
  <!-- Top Announcement Bar (image copy.png reference) -->
  <div class="hero-top-announcement" id="topNoticeBar">
    <span class="badge-news">AWARD</span>
    <span class="hero-top-announcement-text">
      2026 대한민국 바이오·헬스케어 브랜드 대상 수상 ｜ 1:1 맞춤 데일리 포뮬러 무료 진단 프로모션 진행 중
    </span>
    <button type="button" class="hero-top-announcement-close" onclick="document.getElementById('topNoticeBar').style.display='none'" aria-label="공지 닫기">×</button>
  </div>

  <!-- Full-Width Floating GNB (image.png & image copy 2.png reference) -->
  <header class="top-full">
    <nav class="nav-wide">
      <!-- Left: Winner Prize Badge + Quick Category Menu -->
      <div class="header-left-col">
        <a href="#hero" class="winner-prize-badge" title="2026 대한민국 웰니스 대상 수상">
          <svg class="winner-prize-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
            <path d="M4 22h16"></path>
            <path d="M10 14.66V17c0 .55-.45 1-1 1H7c-.55 0-1 .45-1 1v1c0 .55.45 1 1 1h10c.55 0 1-.45 1-1v-1c0-.55-.45-1-1-1h-2c-.55 0-1-.45-1-1v-2.34"></path>
            <path d="M18 4H6v7a6 6 0 0 0 12 0V4z"></path>
          </svg>
          <span class="winner-prize-text">WINNER<br>PRIZE</span>
          <span class="winner-prize-sub">2026</span>
        </a>

        <div class="header-quick-menu">
          <a href="#archive" class="active">피로·야근 케어 ›</a>
          <a href="#archive">프로바이옴 ›</a>
          <a href="#archive">슬립 리셋 ›</a>
          <a href="#archive">아이 포커스 ›</a>
        </div>
      </div>

      <!-- Center: A:FIT Brand Wordmark -->
      <a href="#hero" class="brand-group" title="A:FIT 홈으로 이동" aria-label="A:FIT 홈으로 이동">
        <strong>A:FIT</strong>
      </a>

      <!-- Right: Navigation Links & Action Group -->
      <div class="header-right-nav-group">
        <div class="links-wide">
          <a href="#manifesto">브랜드 소개</a>
          <a href="#archive">15종 컬렉션</a>
          <a href="#curation">AI 맞춤진단</a>
          <a href="#calculator">가성비 계산기</a>
          <a href="#reviews">구독 후기</a>
        </div>

        <div class="gnb-actions-wrap">
          <div class="header-lang-toggle" title="언어 선택">
            <span class="active">KR</span>
            <span>|</span>
            <span>EN</span>
          </div>

          <div class="gnb-search-wrap">
            <input type="text" class="gnb-search-input" aria-label="맞춤 루틴 검색" placeholder="포뮬러 검색">
            <a class="search-link" href="#archive" aria-label="15종 컬렉션 탐색">
              <svg class="gnb-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </a>
          </div>

          <a class="btn primary btn-gnb" href="#checkoutModal">
            <span>맞춤 구독 시작하기</span>
          </a>
        </div>
      </div>
    </nav>
  </header>

  <main>

    <!-- 1. Redesigned Luxury Editorial Hero Section -->
    <section id="hero">
      <!-- Atmospheric Architectural Background Stage (image.png style) -->
      <div class="luxury-hero-stage-bg" aria-hidden="true">
        <div class="luxury-sunlight"></div>
        <div class="luxury-arch-frame"></div>
      </div>

      <!-- Circular Embossed Watermark Stamp (image.png bottom right style) -->
      <div class="luxury-seal-stamp" aria-hidden="true">
        <div class="luxury-seal-text">
          A:FIT PERSONAL WELLNESS · DUAL FORMULATION SCIENCE · EST. 2026 ·
        </div>
      </div>

      <!-- Floating Circle SCROLL DOWN Badge (image copy 2.png style) -->
      <a href="#manifesto" class="hero-scroll-badge" aria-label="다음 섹션으로 스크롤">
        <span>SCROLL</span>
        <span>DOWN</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <polyline points="19 12 12 19 5 12"></polyline>
        </svg>
      </a>

      <!-- Main Two-Column Editorial Hero Content -->
      <div class="hero-editorial-wrap">
        <!-- Left: Copy & Value Proposition & Slider Controls -->
        <div class="hero-copy-col">
          <!-- Series & Category Tag (image copy.png pagination style) -->
          <div class="hero-series-indicator">
            <span class="bullet"></span>
            <span>01 / 04</span>
            <span class="line"></span>
            <span>PERSONALIZED DUAL WELLNESS</span>
          </div>

          <!-- Serif Italic Luxury Catchphrase (image.png style) -->
          <div class="hero-serif-headline">
            High End Wellness,<br>
            Be Fitted, A:FIT
          </div>

          <!-- Grand Korean Headline -->
          <h1 class="hero-main-headline">
            나를 위한<br>
            1:1 맞춤 웰니스
          </h1>

          <!-- Lead Description -->
          <p class="hero-lead-desc">
            불필요한 과잉 섭취와 식비 낭비 없이, 상단 정제와 하단 저점도 액상의 이중제형 특허 기술로 당신의 일상에 정확하게 딱 맞는 데일리 웰니스 루틴을 설계합니다.
          </p>

          <!-- 3 Core Value Metric Pills -->
          <div class="hero-metrics-bar">
            <div class="hero-metric-item">
              <span class="hero-metric-num">01 DUAL</span>
              <strong class="hero-metric-title">이중 제형</strong>
              <span class="hero-metric-sub">상단 정제 + 하단 액상 결합</span>
            </div>
            <div class="hero-metric-item">
              <span class="hero-metric-num">02 ROUTINE</span>
              <strong class="hero-metric-title">스마트 루틴</strong>
              <span class="hero-metric-sub">물 없이 10초 원스톱 완성</span>
            </div>
            <div class="hero-metric-item">
              <span class="hero-metric-num">03 LABEL</span>
              <strong class="hero-metric-title">1:1 개인화</strong>
              <span class="hero-metric-sub">이름 각인 & 7대 처방 라벨</span>
            </div>
          </div>

          <!-- CTA Button Group (image.png black rounded capsule pill style) -->
          <div class="hero-action-group">
            <a href="#checkoutModal" class="btn-pill-primary">
              <span>예약 및 맞춤 처방 시작하기</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
            <a href="#curation" class="btn-pill-secondary">
              <span>라이프스타일 추천 진단 ↓</span>
            </a>
          </div>

          <!-- Interactive Slider Nav (image copy 2.png style) -->
          <div class="hero-slider-nav-row">
            <div class="slider-arrows">
              <button type="button" class="slider-arrow-btn" aria-label="이전 포뮬러" onclick="alert('이전 루틴 컬렉션: 14 EYE FOCUS')">←</button>
              <button type="button" class="slider-arrow-btn" aria-label="다음 포뮬러" onclick="alert('다음 루틴 컬렉션: 06 PROBIOME')">→</button>
            </div>
            <div class="slider-progress-track">
              <div class="slider-progress-bar"></div>
            </div>
            <span class="slider-current-label">01 / 04 WORK DUAL FORMULA</span>
          </div>
        </div>

        <!-- Right: 3D Dual Bottle Centerpiece Showcase -->
        <div class="hero-visual-col">
          <div class="bottle-pedestal-stage">
            <div class="showcase-bottle-wrapper">
              <!-- Background Bottle: Pro (Cream) -->
              <div class="studio-bottle cream flank-bottle left-1" title="06 PRO FORMULA">
                <div class="studio-cap"></div>
                <div class="studio-neck"></div>
                <div class="studio-glass">
                  <div class="studio-liquid"></div>
                  <div class="studio-label">
                    <small>PERSONAL WELLNESS</small>
                    <b>A:FIT</b>
                    <span>ALL-IN-ONE + FIT</span>
                    <i>06 PRO</i>
                    <em>1:1 FORMULA<br>100 ml</em>
                  </div>
                </div>
              </div>

              <!-- Main Hero Bottle: 01 WORK (Lime) -->
              <div class="studio-bottle lime showcase-main-bottle" title="A:FIT 시그니처 듀얼 팩 (01 WORK)">
                <div class="studio-cap"></div>
                <div class="studio-neck"></div>
                <div class="studio-glass">
                  <div class="studio-liquid"></div>
                  <div class="studio-label">
                    <small>PERSONAL WELLNESS</small>
                    <b>A:FIT</b>
                    <span>ALL-IN-ONE + FIT</span>
                    <i>01 WORK</i>
                    <em>1:1 DAILY FORMULA<br>100 ml</em>
                  </div>
                </div>
              </div>

              <!-- Background Bottle: Sleep (Pink) -->
              <div class="studio-bottle pink flank-bottle right-1" title="12 SLEEP FORMULA">
                <div class="studio-cap"></div>
                <div class="studio-neck"></div>
                <div class="studio-glass">
                  <div class="studio-liquid"></div>
                  <div class="studio-label">
                    <small>PERSONAL WELLNESS</small>
                    <b>A:FIT</b>
                    <span>ALL-IN-ONE + FIT</span>
                    <i>12 SLEEP</i>
                    <em>1:1 FORMULA<br>100 ml</em>
                  </div>
                </div>
              </div>
            </div>

            <!-- Floating Product Spec & Engraving Pill Card -->
            <div class="hero-product-pill-card">
              <div class="hero-product-pill-header">
                <span class="hero-product-pill-tag">SIGNATURE DUAL PACK</span>
                <span class="hero-engrave-badge">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg>
                  박지안 님 개인화 라벨
                </span>
              </div>
              <div class="hero-product-pill-name">01 야근·피로 회복 루틴</div>
              <div class="hero-product-pill-desc">
                상단: 밀크씨슬 130mg + 활력 비타민B군 500%<br>
                하단: 귀리 식이섬유 단백 농축 저점도 액상
              </div>
              <div class="hero-product-pill-footer">
                <div class="hero-product-price">
                  1병 2,660원대 <small>(정기구독 시 월 79,800원)</small>
                </div>
                <span class="hero-engrave-badge">무료 각인</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
`;

// Replace from <header class="top-full"> down to </section>
const headerRegex = /<header class="top-full">[\s\S]*?<\/section>/;
if (headerRegex.test(content)) {
  content = content.replace(headerRegex, newHeaderAndHeroMarkup.trim());
  console.log('Successfully replaced Header and Hero Section!');
} else {
  console.error('Could not find header and hero section in hero_test.html');
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Updated hero_test.html written successfully.');
